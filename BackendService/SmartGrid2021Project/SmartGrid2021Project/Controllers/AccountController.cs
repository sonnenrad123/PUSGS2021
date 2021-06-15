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
        private readonly GeneralDBContext _context;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IOptions<ApplicationSettings> appSettings,
            GeneralDBContext dBContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.appSettings = appSettings.Value;
            this._context = dBContext;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUsers()
        {

            return await Task.Run(() =>
            {
                return userManager.Users.ToList();
            });
        }



        [HttpGet]
        [Route("GetAllCustomers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllCustomers()
        {
            return await Task.Run(() =>
            {
                return userManager.Users.Where((x) => x.RoleOfUser == "User").ToList();
            });

        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/Account/Register
        public async Task<IActionResult> RegisterApplicationUser(UserModel user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    AppUser appUser;
                    if (user.UserTeam == null) {
                         appUser = new AppUser()
                        {
                            UserName = user.Username,
                            Email = user.UserEmail,
                            DateOfBirth = user.DateOfBirth,
                            UserTeam = user.UserTeam,
                            RoleOfUser = user.RoleOfUser.ToString(),
                            UserImage = user.UserImage,
                            LastName = user.LastName,
                            FirstName = user.FirstName,
                            Address = user.Address,
                            AccountAllowed = false,
                        };
                    }
                    else
                    {
                        appUser = new AppUser()
                        {
                            UserName = user.Username,
                            Email = user.UserEmail,
                            DateOfBirth = user.DateOfBirth,
                            RoleOfUser = user.RoleOfUser.ToString(),
                            UserImage = user.UserImage,
                            LastName = user.LastName,
                            FirstName = user.FirstName,
                            Address = user.Address,
                            AccountAllowed = false,
                        };
                        _context.Teams.FirstOrDefault(_ => _.teamID == user.UserTeam.teamID).teamMembers.Add(appUser);
                    }
                    var result = await userManager.CreateAsync(appUser, user.Password);
                    if (result.Succeeded)
                    {
                        var token = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
                        EmailHelper emailHelper = new EmailHelper();
                        var confirmationLink = Url.ActionLink("ConfirmEmail", "Account", new { token, email = appUser.Email }, Request.Scheme);
                        

                        await emailHelper.SendEmailAsync(appUser.Email, "Successfully registered. Your account must be allowed by admin!", confirmationLink);


                        return Ok(result);
                    }

                }
            }catch(Exception e)
            {
                
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
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password) && user.AccountAllowed == true)
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

        [HttpGet("{username}")]
        [Route("AllowLogin")]
        public async Task<IActionResult> AllowUserLogin([FromQuery] string username)
        {
            try {
                _context.AppUsers.FirstOrDefault(_ => _.UserName == username).AccountAllowed = true;
                _context.SaveChanges();
                return Ok();
            }catch(Exception e)
            {

            }
            return NotFound();
        }

        [HttpGet("{username}")]
        [Route("BlockLogin")]
        public async Task<IActionResult> BlockUserLogin([FromQuery] string username)
        {
            try
            {
                _context.AppUsers.FirstOrDefault(_ => _.UserName == username).AccountAllowed = false;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {

            }
            return NotFound();
        }

        [HttpDelete("{username}")]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromQuery] string username)
        {
            try
            {
                _context.Users.Remove(_context.AppUsers.FirstOrDefault(_ => _.UserName == username));
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {

            }
            return NotFound();
        }
    }
}
