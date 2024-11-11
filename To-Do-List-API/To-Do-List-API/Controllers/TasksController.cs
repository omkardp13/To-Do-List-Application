using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using To_Do_List_API.Models.Domain;
using To_Do_List_API.Services.Interfaces;
using ToDoListAPI.Services;

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
            if (tasks == null)
            {
                return NotFound("No tasks found for the specified user.");
            }
            return Ok(tasks);
        }



        // GET: api/tasks/5
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

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<Tasks>> CreateTask([FromBody] Tasks task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            var newTask = new Tasks
            {
                UserId = task.UserId, // Set to an existing UserId
                Title = task.Title,
                Description = task.Description,
            };

            //var createdTask = await CreateTask(newTask);


            var createdTask = await _taskService.CreateTask(newTask);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.TaskId }, createdTask);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Tasks>> UpdateTask(int id, [FromBody] Tasks task)
        {
            if (id != task.TaskId)
            {
                return BadRequest();
            }

            var updatedTask = await _taskService.UpdateTask(id, task);
            if (updatedTask == null)
            {
                return NotFound();
            }

            return Ok(updatedTask);
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var success = await _taskService.DeleteTask(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
