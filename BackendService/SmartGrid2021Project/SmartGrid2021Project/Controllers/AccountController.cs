using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SmartGrid2021Project.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private  UserManager<AppUser> userManager;
        private  SignInManager<AppUser> signInManager;
        private readonly ApplicationSettings appSettings;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IOptions<ApplicationSettings> appSettings)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.appSettings = appSettings.Value;
        }

        [HttpGet]

        public async Task<IQueryable<AppUser>> GetAllUsers()
        {

            return await Task.Run(() =>
            {
                return userManager.Users;
            });
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/Account/Register
        public async Task<IActionResult> RegisterApplicationUser(UserModel user)
        {
            if (ModelState.IsValid)
            {
                var appUser = new AppUser()
                {
                    UserName = user.Username,
                    Email = user.UserEmail,
                    DateOfBirth = user.DateOfBirth,
                    UserTeam = user.UserTeam,
                    RoleOfUser = user.RoleOfUser.ToString(),
                    UserImage = "",
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    Address = user.Address

                };

                var result = await userManager.CreateAsync(appUser, user.Password);
                if (result.Succeeded)
                {
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
                    //var confirmationLink = Url.RouteUrl("ConfirmEmail", new { token, email = appUser.Email }, Request.Scheme);
                    EmailHelper emailHelper = new EmailHelper();
                     var confirmationLink = Url.ActionLink("ConfirmEmail", "Account", new { token, email = appUser.Email }, Request.Scheme);

                    await emailHelper.SendEmailAsync(appUser.Email, "Successfully registered", confirmationLink);

                    return Ok(result);
                }

            }
            throw new Exception();
        }


        [Route("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if(user == null)
            {
                throw new Exception();
            }
            var result = await userManager.ConfirmEmailAsync(user, token);
            
            return Redirect("https://localhost:4200/test");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UserLoginCredentials model)
        {
            var user = await userManager.FindByEmailAsync(model.UserEmail);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("Roles", "admin")
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpPost]
        [Route("GoogleSocialLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> GoogleSocialLogin(AuthenticateRequest loginModel)
        {
            var test = appSettings.JWT_Secret;
            if (VerifyToken(loginModel.IdToken))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }

            return Ok();
        }

        [HttpPost]
        [Route("FacebookSocialLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> FacebookSocialLogin(AuthenticateRequest loginModel)
        {
            var test = appSettings.JWT_Secret;
            if (VerifyFacebookToken(loginModel.authToken))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }

            return Ok();
        }
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
        private const string FacebookApiTokenInfoUrl = "https://graph.facebook.com/me?access_token={0}&fields=id,name,birthday,email,first_name,last_name";

        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }

        public bool VerifyFacebookToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(FacebookApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var facebookApiTokenInfo = JsonConvert.DeserializeObject<FacebookApiTokenInfo>(response);

            return true;
        }
    }
}
