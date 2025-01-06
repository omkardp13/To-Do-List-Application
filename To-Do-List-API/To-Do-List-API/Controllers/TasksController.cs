using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using To_Do_List_API.Models.Domain;
using To_Do_List_API.Services.Interfaces;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tasks>>> GetTasks([FromQuery] int id)
        {
            var tasks = await _taskService.GetAllTasks(id);
            if (tasks == null || tasks.Count == 0)
            {
                return NotFound("No tasks found for the specified user.");
            }
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tasks>> GetTask(int id)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> CreateTask([FromBody] Tasks task)
        {
            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                // Return BadRequest with the validation errors
                return BadRequest(ModelState);
            }

            // You can still manually check for specific conditions if needed
            if (task == null)
            {
                return BadRequest("Task data is required.");
            }

            var newTask = new Tasks
            {
                UserId = task.UserId,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted
            };

            var createdTask = await _taskService.CreateTask(newTask);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.TaskId }, createdTask);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Tasks>> UpdateTask(int id, [FromBody] Tasks task)
        {
            if (id != task.TaskId)
            {
                return BadRequest("Task ID mismatch.");
            }

            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedTask = await _taskService.UpdateTask(id, task);
            if (updatedTask == null)
            {
                return NotFound("Task not found.");
            }

            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var success = await _taskService.DeleteTask(id);
            if (!success)
            {
                return NotFound("Task not found.");
            }

            return NoContent();
        }
    }
}
