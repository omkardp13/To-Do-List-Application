using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using To_Do_List_API.Models.Domain;
using To_Do_List_API.Models.DTOs;
using To_Do_List_API.Repository.Interface;

namespace To_Do_List_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UsersController(IUserRepository _userRepository)
        {
            this.userRepository = _userRepository;
        }


        [HttpPost]
        [Route("login")]

        public async Task<ActionResult<UserDto>> Login([FromBody] UserLoginDto user)
        {

            var response = await userRepository.LoginAsync(user);

            if(response == null)
            {
                return null;
            }

            var responseDto = new UserDto
            {
                UserId=response.UserId,
                UserName = response.UserName,
                Email = response.Email,
            };

            return responseDto;
        }


        [HttpPost]
        public async Task<ActionResult<UserDto>> Register([FromBody] UserRegisterDto user)
        {

            var passwordHasher = new PasswordHasher<Users>();

            //Map DTO to Domain Model

            var response = new Users
            {
                UserName = user.UserName,
                Email = user.Email
            };

            response.PasswordHash = passwordHasher.HashPassword(response, user.PasswordHash);

            var result=await userRepository.CreateAsync(response);

            //Map Domain model to DTO

            var responseDto = new UserDto
            {
                UserName = response.UserName,
                Email = response.Email,
            };

            return Ok(responseDto);
        }
    }
}
