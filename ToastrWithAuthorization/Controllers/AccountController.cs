using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ToastrWithAuthorization.Constants;
using ToastrWithAuthorization.Data.Identity;
using ToastrWithAuthorization.Models;
using ToastrWithAuthorization.Services;
using ToastrWithAuthorization.Validators;

namespace ToastrWithAuthorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IMapper _mapper { get; set; }
        private UserManager<AppUser> _userManager { get; set; }
        private IJwtTokenService _tokenService { get; set; }
        public AccountController(IMapper mapper, UserManager<AppUser> userManager, 
            IJwtTokenService tokenService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] UserViewModel model) 
        {
                AppUser user = _mapper.Map<AppUser>(model);
                string dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                string fullPath = null;
                if (model.Image != null) 
                {
                    string fileName = Path.GetRandomFileName() + Path.GetExtension(model.Image.FileName);
                    fullPath = Path.Combine(dir, fileName);
                    user.Image = fileName;

                    using (var file = System.IO.File.Create(fullPath)) 
                    {
                        model.Image.CopyTo(file);
                    }
                }
                
                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded) 
                {
                    if (!string.IsNullOrEmpty(fullPath))
                        System.IO.File.Delete(fullPath);
                    ErrorViewModel errors = new ErrorViewModel();
                    foreach(var error in result.Errors) 
                    {
                        errors.Errors.Invalid.Add(error.Description);
                    }
                    return BadRequest(errors);
                }

                var resultRole = await _userManager.AddToRoleAsync(user, Roles.User);
            if (!resultRole.Succeeded)
            {
                _userManager.DeleteAsync(user).Wait();
                if (!string.IsNullOrEmpty(fullPath)) 
                {
                    System.IO.File.Delete(fullPath);
                }
                ErrorViewModel errors = new ErrorViewModel();
                foreach (var error in result.Errors)
                {
                    errors.Errors.Invalid.Add(error.Description);
                }
                return BadRequest(errors);
            }
            
            return Ok(new { 
                token=_tokenService.CreateToken(user)
            });
        }

        [HttpPost]
        [Route("get")]
        public IActionResult GetUsers() 
        {
                return Ok(new
                {
                    users = 
                    _userManager.Users.Select(x => new
                    {
                        Id = x.Id,
                        firstname = x.Firstname,
                        secondname = x.Secondname,
                        phone = x.Phone,
                        email = x.Email,
                        image = x.Image
                    }).ToList()
                });
        }

        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> DeleteUser([FromBody]int id)
        {
            return await Task.Run(() => {
                IActionResult result = null;
                var user = _userManager.FindByIdAsync(id.ToString()).Result;
                if (user != null)
                {
                    var resultDelete = _userManager.DeleteAsync(user).Result;
                    if (resultDelete.Succeeded)
                    {
                        if (!string.IsNullOrEmpty(user.Image))
                        {
                            string filePath = Path.Combine(Directory.GetCurrentDirectory(),
                                "Images", user.Image);
                            if (System.IO.File.Exists(filePath))
                                System.IO.File.Delete(filePath);
                        }
                        result = Ok();
                    }
                    else
                    {
                        var accountError = new ErrorViewModel();
                        foreach (var error in resultDelete.Errors)
                        {
                            accountError.Errors.Invalid.Add(error.Description);
                        }
                        result = BadRequest(accountError);
                    }

                }
                else 
                {
                    var accountError = new ErrorViewModel();
                        accountError.Errors.Invalid.Add("Користувача не знайдено!");
     
                    result = BadRequest(accountError);
                }
                return result;
            });
        }

        [HttpPost]
        [Route("edit")]
        public async Task<IActionResult> EditUser([FromForm] UserEditViewModel model) 
        {
            IActionResult result = null;
            var user = _userManager.FindByIdAsync(model.Id.ToString()).Result;
            if (user != null)
            {
                user.Firstname = model.Firstname;
                user.Secondname = model.Secondname;
                user.Phone = model.Phone;
                if (_userManager.FindByEmailAsync(model.Email).Result != null && user.Email != model.Email)
                {
                    var accountError = new ErrorViewModel();
                    accountError.Errors.Invalid.Add("Пошта уже використовується!");
                    return BadRequest(accountError);
                }
                user.Email = model.Email;
                user.UserName = model.Email;

                if (model.Image != null) 
                {
                    string dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                    if (!string.IsNullOrEmpty(user.Image)) 
                    {
                        string fullPath = Path.Combine(dir, user.Image);
                        if (System.IO.File.Exists(fullPath))
                            System.IO.File.Delete(fullPath);
                    }

                    string fileName = Path.GetRandomFileName() + Path.GetExtension(model.Image.FileName);
                    string fullPathNew = Path.Combine(dir, fileName);
                    using (var stream = System.IO.File.Create(fullPathNew)) 
                    {
                        user.Image = fileName;
                        model.Image.CopyTo(stream);
                    }
                }

                if (!string.IsNullOrEmpty(model.OldPassword) && !string.IsNullOrEmpty(model.Password))
                {
                    var changePassword = _userManager
                        .ChangePasswordAsync(user, model.OldPassword, model.Password).Result;

                    if (!changePassword.Succeeded)
                    {
                        var accountError = new ErrorViewModel();
                            accountError.Errors.Invalid.Add("Пароль не правильний!");
                        return BadRequest(accountError);
                    }
                }

                var resultUpdate =  await _userManager.UpdateAsync(user);
                if (resultUpdate.Succeeded) 
                {
                    result = Ok("Усішно оновлено дані!");
                } 
                else 
                {
                    var accountError = new ErrorViewModel();
                    foreach (var error in resultUpdate.Errors) 
                    {
                        accountError.Errors.Invalid.Add(error.Description);
                    }
                    result = BadRequest(accountError);
                }
            }
            else 
            {
                var accountError = new ErrorViewModel();
                accountError.Errors.Invalid.Add("Користувача не існує!");
                
                result = BadRequest(accountError);
            }
            return result;
        }

        [HttpPost]
        [Route("getuser")]
        public async Task<IActionResult> GetUser([FromBody] int id)
        {
            return await Task.Run(() => {
                return Ok(_userManager
                    .FindByIdAsync(id.ToString()).Result);
            });
        }

    }
}
