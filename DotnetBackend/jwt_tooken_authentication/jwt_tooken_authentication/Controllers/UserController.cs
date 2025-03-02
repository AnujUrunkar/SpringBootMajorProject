using jwt_tooken_authentication.Dtos;
using jwt_tooken_authentication.Models;
using jwt_tooken_authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace jwt_tooken_authentication.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly EmailNotificationService _emailNotificationService;

        public UserController(IUserService userService, EmailNotificationService emailNotificationService)
        {
            _userService = userService;
            _emailNotificationService = emailNotificationService;
        }

        // User Endpoints

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            RegisterDto us = new RegisterDto();
            us.FirstName = user.FirstName;
            us.LastName = user.LastName;
            us.Email = user.Email;
            us.Password = user.Password;
            us.Role = user.Role.ToString();
            return Ok(us);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(RegisterDto user)
        {
            var createdUser = await _userService.AddUserAsync(user);
            RegisterDto us = new RegisterDto();
            us.FirstName = user.FirstName;
            us.LastName = user.LastName;
            us.Email = user.Email;
            us.Password = user.Password;
            us.Role = user.Role.ToString();
            _emailNotificationService.SendEmail(
              to: $"{user.Email}",
              subject: "New Registration",
              body: "Welecoming you to UpTime hope you have a great time"
          );
            return Ok(us);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] RegisterDto user)
        {
            //if (id != user.Id) return BadRequest();
            var updatedUser = await _userService.UpdateUserAsync(id, user);
            return Ok(updatedUser);
        }
        //[Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}

