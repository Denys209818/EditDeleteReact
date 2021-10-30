using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToastrWithAuthorization.Data.Identity;
using ToastrWithAuthorization.Models;

namespace ToastrWithAuthorization.Validators
{
    public class UserModelValidator : AbstractValidator<UserViewModel>
    {
        private UserManager<AppUser> _userManager { get; set; }
        public UserModelValidator(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            RuleFor(x => x.Firstname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Secondname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Поле не може бути пустим!")
                .MinimumLength(6).WithMessage("Мінімальна кількість символів - 6");
            RuleFor(x => x.ConfirmPassword).NotEmpty().WithMessage("Поле не може бути пустим!")
                .Equal(x => x.Password).WithMessage("Поля 'Пароль' не співпадають!");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Поле не може бути пустим!");

            RuleFor(x => x.Email).NotEmpty().WithMessage("Поле не може бути пустим!")
                .DependentRules(() => {
                    RuleFor(x => x.Email).EmailAddress().WithMessage("Не коректно введена пошта!")
                    .Must(IsUnique).WithMessage("Користувач уже зареєстрований!");
                });
        }

        public bool IsUnique(string email) 
        {
            return _userManager.FindByEmailAsync(email).Result == null;
        }
    }

    public class UserEditModelValidator : AbstractValidator<UserEditViewModel>
    {
        private UserManager<AppUser> _userManager { get; set; }
        public UserEditModelValidator(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            RuleFor(x => x.Firstname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Id).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Secondname).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Поле не може бути пустим!");
            RuleFor(x => x.Password).MinimumLength(6).WithMessage("Мінімальна кількість символів - 6");
            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password).WithMessage("Поля 'Пароль' не співпадають!");
            RuleFor(x => x.Phone).NotEmpty().WithMessage("Поле не може бути пустим!");

            RuleFor(x => x.Email).NotEmpty().WithMessage("Поле не може бути пустим!")
                .DependentRules(() => {
                    RuleFor(x => x.Email).EmailAddress().WithMessage("Не коректно введена пошта!")
                    //.Must(IsUnique).WithMessage("Користувач з такою поштою вже існує!")
                    ;
                });
        //}
        }

        //public bool IsUnique(string email) 
        //{
        //    return _userManager.FindByEmailAsync(email).Result == null;
        //}
    }
}
