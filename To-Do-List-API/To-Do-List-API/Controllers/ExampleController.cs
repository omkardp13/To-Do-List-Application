using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using To_Do_List_API.Custom_Middlewares;

namespace To_Do_List_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExampleController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            throw new CustomException("Something went wrong", 400, "Invalid request parameters");
        }
    }
}
