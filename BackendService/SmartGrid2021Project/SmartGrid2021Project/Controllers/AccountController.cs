using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
using static Google.Apis.Auth.GoogleJsonWebSignature;
using Microsoft.AspNetCore.Authentication.Facebook;
using System.Globalization;

namespace SmartGrid2021Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]

    public class AccountController : ControllerBase
    {
        private  UserManager<AppUser> userManager;
        private  SignInManager<AppUser> signInManager;
        private readonly ApplicationSettings appSettings;
        private readonly GeneralDBContext _context;
        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
        private const string FacebookUserInfoUrl = "https://graph.facebook.com/v11.0/me?fields=id%2Cname%2Cfirst_name%2Clast_name%2Cemail%2Cbirthday%2Cpicture&access_token={0}";
        private static int idName = 1;
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
        [AllowAnonymous]
        [Route("Register")]
        //POST : /api/Account/Register
        public async Task<ActionResult<AuthenticationResponse>> RegisterApplicationUser([FromBody]UserModel user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //da li vec postoji registrovan
                    var userFromDb =  _context.AppUsers.SingleOrDefault(_ => _.Email == user.UserEmail);
                    if(userFromDb != null)
                    {
                        //TODO
                        
                    }
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

                    await _context.UserClaims.AddAsync(
                        new IdentityUserClaim<string>()
                        {
                            ClaimType = "roleOfUser",
                            ClaimValue = appUser.RoleOfUser,
                            UserId = appUser.Id
                        });

                    try
                    {
                        var result = await userManager.CreateAsync(appUser, user.Password);
                    
                    if (result.Succeeded)
                    {
                        var token = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
                        EmailHelper emailHelper = new EmailHelper();
                        var confirmationLink = Url.ActionLink("ConfirmEmail", "Account", new { token, email = appUser.Email }, Request.Scheme);
                        

                        await emailHelper.SendEmailAsync(appUser.Email, "Successfully registered. [Request is processing] Your account must be allowed by admin and then you can log in into application!", confirmationLink);

                       
                        

                        return await BuildToken(appUser);
                    }
                    else
                    {
                        return BadRequest(result.Errors);
                    }
                    }
                    catch (Exception e){

                    }
                }
            }catch(Exception e)
            {
                
            }
            throw new Exception();
        }

        private async Task<AuthenticationResponse> BuildToken(AppUser userModel)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userModel.Email)
                
            };

            var user = await userManager.FindByEmailAsync(userModel.Email);
            var claimDb = await userManager.GetClaimsAsync(user);
            claims.AddRange(claimDb);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWT_Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(1);
            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse() {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
        [Route("ConfirmEmail")]
        [AllowAnonymous]

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
        [AllowAnonymous]
        [Route("Login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody]UserLoginCredentials model)
        {
            var user = await userManager.FindByEmailAsync(model.UserEmail);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password) && user.AccountAllowed == true)
            {

                var appUser = _context.AppUsers.FirstOrDefault(_ => _.Email.Equals(model.UserEmail));
                return await BuildToken(appUser);
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpPost]
        [Route("GoogleSocialLogin")]
        [AllowAnonymous]
        // POST: api/<controller>/Login
        public async Task<ActionResult<AuthenticationResponse>> GoogleSocialLogin([FromBody] AuthenticateRequest loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(it => it.Errors).Select(it => it.ErrorMessage));

            
            UserModel validateUser = VerifyToken(loginModel);
            if (validateUser != null)
            {
                return await RegisterApplicationUser(validateUser);
                
            }
            
            return NoContent();
        }
        

        [HttpPost]
        [Route("FacebookSocialLogin")]
        [AllowAnonymous]
        // POST: api/<controller>/Login
        public async Task<ActionResult<AuthenticationResponse>> FacebookSocialLogin([FromBody]AuthenticateRequest loginModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(it => it.Errors).Select(it => it.ErrorMessage));
            UserModel uModel = VerifyFacebookToken(loginModel);
            if(uModel != null)
            {
                return await RegisterApplicationUser(uModel); 
            }

            return NoContent();
        }
        
        public UserModel VerifyToken(AuthenticateRequest providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken.IdToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return null;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            try
            {
                var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

                UserModel var = new UserModel()
                {
                    FirstName = googleApiTokenInfo.name.Split(' ')[0],
                    LastName = googleApiTokenInfo.name.Split(' ')[1],
                    UserImage = googleApiTokenInfo.picture,
                    RoleOfUser = "USER",
                    UserEmail = googleApiTokenInfo.email,
                    Username = googleApiTokenInfo.email,
                    DateOfBirth = providerToken.DateOfBirth,
                    Address = providerToken.Address,
                    Password = providerToken.Password
                };
                idName++;
                return var;
            }
            catch(Exception e)
            {

            }
            return null;
        }

        public UserModel VerifyFacebookToken(AuthenticateRequest providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(FacebookUserInfoUrl, providerToken.authToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return null;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            try
            {
                var facebookApiTokenInfo = JsonConvert.DeserializeObject<FacebookApiTokenInfo>(response);
                UserModel var = new UserModel()
                {
                    FirstName = facebookApiTokenInfo.name.Split(' ')[0],
                    LastName = facebookApiTokenInfo.name.Split(' ')[1],
                    UserImage = facebookApiTokenInfo.picture.data.URL,
                    RoleOfUser = "USER",
                    UserEmail = facebookApiTokenInfo.email,
                    Username = facebookApiTokenInfo.email,
                    DateOfBirth = DateTime.Parse(facebookApiTokenInfo.birthday, CultureInfo.InvariantCulture),
                    Address = providerToken.Address,
                    Password = providerToken.Password
                };
                idName++;
                return var;

            }
            catch(Exception e)
            {

            }
            return null;
        }

        [HttpGet("{username}")]
        [Route("AllowLogin")]
        public async Task<IActionResult> AllowUserLogin([FromQuery] string username)
        {
            try {
                var user = _context.AppUsers.FirstOrDefault(_ => _.UserName == username);

                if (user != null)
                {
                    user.AccountAllowed = true;
                    _context.SaveChanges();

                    EmailHelper emailHelper = new EmailHelper();
                    

                    await emailHelper.SendEmailAsync(user.Email, "[Request is processed]", "Your account is allowed by admin and now you can log in into application! \nAPP LINK: http://localhost:4200");



                    return Ok();
                }
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
                var user = _context.AppUsers.FirstOrDefault(_ => _.UserName == username);
                if (user != null)
                {
                    user.AccountAllowed = false;
                    _context.SaveChanges();

                    EmailHelper emailHelper = new EmailHelper();


                    await emailHelper.SendEmailAsync(user.Email, "[Request is processed]", "Your account is not allowed by admin and you can not use application!");



                    return Ok();
                }
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
