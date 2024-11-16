using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using To_Do_List_API.Database;
using To_Do_List_API.Models.Domain;
using To_Do_List_API.Services.Interfaces;

namespace ToDoListAPI.Services
{
   
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<List<Tasks>> GetAllTasks(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }


        public async Task<Tasks> GetTaskById(int taskId)
        {
            return await _context.Tasks.Include(t => t.User).FirstOrDefaultAsync(t => t.TaskId == taskId);
        }

        public async Task<Tasks> CreateTask(Tasks task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<Tasks> UpdateTask(int taskId, Tasks task)
        {
            var existingTask = await _context.Tasks.FindAsync(taskId);
            if (existingTask == null) return null;

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;
            existingTask.CreatedAt = task.CreatedAt;

            await _context.SaveChangesAsync();
            return existingTask;
        }

        public async Task<bool> DeleteTask(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}
