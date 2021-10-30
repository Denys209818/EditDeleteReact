using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToastrWithAuthorization.Models
{
    public class UserViewModel
    {
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Phone { get; set; }
        public IFormFile Image { get; set; }
        public string ConfirmPassword { get; set; }
        public string Password { get; set; }

    }

    public class UserEditViewModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Secondname { get; set; }
        public string Phone { get; set; }
        public IFormFile Image { get; set; }
        public string ConfirmPassword { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }

    }
}
