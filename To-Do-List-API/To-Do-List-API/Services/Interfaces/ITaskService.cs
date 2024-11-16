using To_Do_List_API.Models.Domain;

namespace To_Do_List_API.Services.Interfaces
{
    public interface ITaskService
    {
        Task<List<Tasks>> GetAllTasks(int id);
        Task<Tasks> GetTaskById(int taskId);
        Task<Tasks> CreateTask(Tasks task);
        Task<Tasks> UpdateTask(int taskId, Tasks task);
        Task<bool> DeleteTask(int taskId);
    }

}
