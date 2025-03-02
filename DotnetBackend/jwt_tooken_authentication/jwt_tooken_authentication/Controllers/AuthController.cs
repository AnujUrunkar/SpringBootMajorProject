using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using jwt_tooken_authentication.Models;
using jwt_tooken_authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace jwt_tooken_authentication.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        public AuthController(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> login([FromBody] UserLogin usl)
        {
            var user = await Authenticate(usl);
            if (user != null)
            {
                var tokken = Generate(user);
                return Ok(tokken);
            }
            return NotFound("user not found");
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credinetials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                  //new Claim(ClaimTypes.Email, user.Email),
                //  new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub,_config["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                  new Claim("user_id",user.Id.ToString()),
                //  new Claim(ClaimTypes.Role, user.Role.ToString()),
                  new Claim("authorities",user.Role.ToString()),
                  new Claim("sub",user.Email),


            };
            var tokken = new JwtSecurityToken(issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"], claims: claims, expires: DateTime.Now.AddMinutes(5), signingCredentials: credinetials);

            return new JwtSecurityTokenHandler().WriteToken(tokken);
        }

        private async Task<User> Authenticate(UserLogin usl)
        {
            //  var user = UserConstants.Users.FirstOrDefault(o => o.Email == usl.Email && o.Password == usl.Password);
            var user = await _userService.GetAllUsersAsync();
            var ss = user.FirstOrDefault(o => o.Email == usl.Email && o.Password == usl.Password);
            if (user != null)
            {
                return ss;
            }
            return null;
        }
    }
}


//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
//using jwt_tooken_authentication.Models;
//using jwt_tooken_authentication.Services;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;

//namespace jwt_tooken_authentication.Controllers
//{
//    [EnableCors("AllowAll")]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IConfiguration _config;
//        private readonly IUserService _userService;
//        public AuthController(IConfiguration config, IUserService userService)
//        {
//            _config = config;
//            _userService = userService;
//        }
//        [AllowAnonymous]
//        [HttpPost]
//        public async Task<IActionResult> login([FromBody] UserLogin usl)
//        {
//            var user = await Authenticate(usl);
//            if (user != null)
//            {
//                var tokken = Generate(user);
//                return Ok(tokken);
//            }
//            return NotFound("user not found");
//        }

//        private string Generate(User user)
//        {
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//            var credinetials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
//            var claims = new[]
//            {
//                 // new Claim(ClaimTypes.Email, user.Email),
//                //  new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
//                new Claim(JwtRegisteredClaimNames.Sub,_config["Jwt:Subject"]),
//                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
//                new Claim("id",user.Id.ToString()),
//                  new Claim(ClaimTypes.Role, user.Role.ToString()),

//            };
//            var tokken = new JwtSecurityToken(issuer: _config["Jwt:Issuer"],
//                audience: _config["Jwt:Audience"], claims: claims, expires: DateTime.Now.AddMinutes(5), signingCredentials: credinetials);

//            return new JwtSecurityTokenHandler().WriteToken(tokken);
//        }

//        private async Task<User> Authenticate(UserLogin usl)
//        {
//            //  var user = UserConstants.Users.FirstOrDefault(o => o.Email == usl.Email && o.Password == usl.Password);
//            var user = await _userService.GetAllUsersAsync();
//            var ss = user.FirstOrDefault(o => o.Email == usl.Email && o.Password == usl.Password);
//            if (user != null)
//            {
//                return ss;
//            }
//            return null;
//        }
//    }
//}
