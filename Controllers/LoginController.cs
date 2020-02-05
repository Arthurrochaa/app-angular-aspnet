using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using app_angular_aspnet.Auth.Configurations;
using app_angular_aspnet.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace app_angular_aspnet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public LoginController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(
            [FromBody] User user,
            [FromServices] SigningConfiguration signingConfigurations,
            [FromServices] TokenConfigurations tokenConfigurations)
        {

            var userIdentity = _userManager.FindByNameAsync(user.Username).Result;
            if (userIdentity != null)
            {
                var loginResult = _signInManager.CheckPasswordSignInAsync(userIdentity, user.Password, false).Result;

                if (loginResult.Succeeded)
                {
                    ClaimsIdentity identity = new ClaimsIdentity(new GenericIdentity(user.Username, "Login"), new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Username) });

                    DateTime dateCreation = DateTime.Now;
                    DateTime expirationDate = dateCreation + TimeSpan.FromSeconds(tokenConfigurations.Seconds);

                    var handler = new JwtSecurityTokenHandler();
                    var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                    {
                        Issuer = tokenConfigurations.Issuer,
                        Audience = tokenConfigurations.Audience,
                        SigningCredentials = signingConfigurations.SigningCredentials,
                        Subject = identity,
                        NotBefore = dateCreation,
                        Expires = expirationDate
                    });
                    var token = handler.WriteToken(securityToken);

                    var obj = new
                    {
                        authenticated = true,
                        created = dateCreation.ToString("yyyy-MM-dd HH:mm:ss"),
                        expiration = expirationDate.ToString("yyyy-MM-dd HH:mm:ss"),
                        accessToken = token,
                        message = "OK"
                    };

                    return Ok(obj);
                }
                else
                {
                    return BadRequest(new {
                        authenticated = false, 
                        message = "Authentication failed." 
                    });
                }
            }
            else
            {
                return BadRequest("User not found.");
            }
        }
    }
}