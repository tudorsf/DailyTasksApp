using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;
        public ToDoController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }


        [HttpPost("addTask")]
        public ActionResult<ToDo> CreateTask([FromBody] ToDo request)
        {


            var task = new ToDo();

            task.ActivityName = request.ActivityName;
            task.Date = request.Date.AddHours(3);
            task.isCompleted = false;
            task.DayId = int.Parse(request.Date.ToString("ddMMyyyy"));


            _context.ToDoList.Add(task);
            _context.SaveChanges();
            return Ok();
        }


        [HttpGet("getTasks/{id}")]
        public ActionResult<List<ToDo>> GetTasks(int id)
        {
            var tasks = _context.ToDoList.Where(x => x.DayId == id).ToList();
            return tasks;
        }

        [HttpGet("getTasks")]
        public ActionResult<List<ToDo>> GetAllTasks()
        {
            var tasks = _context.ToDoList.ToList();
            return tasks;
        }

        [HttpPost("editTask")]
        public ActionResult<ToDo> EditTask([FromBody] ToDo request)
        {


            var task = _context.ToDoList.FirstOrDefault(x => x.Id == request.Id);
            if(task != null)
            {

                task.ActivityName = request.ActivityName;
                task.isCompleted = request.isCompleted;
                _context.SaveChanges();
                return task;
            }
            else
            {
                return BadRequest("task not found");
            }
        }

        [HttpDelete("deleteTask/{id}")]
        public ActionResult<ToDo> DeleteTask(int id)
        {
            var task = _context.ToDoList.FirstOrDefault(x => x.Id == id);

            if (task != null)
            {
                _context.ToDoList.Remove(task);

                _context.SaveChanges();

                return Ok();
            }
            
            else
            {
                return BadRequest("task not found");

            }


        }

    }
}
