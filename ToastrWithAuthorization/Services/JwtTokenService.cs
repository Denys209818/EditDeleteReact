using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToastrWithAuthorization.Data.Identity;

namespace ToastrWithAuthorization.Services
{
    public interface IJwtTokenService 
    {
        public string CreateToken(AppUser user);
    }
    public class JwtTokenService : IJwtTokenService
    {
        public UserManager<AppUser> _userManager { get; set; }
        public IConfiguration _configuration { get; set; }
        public JwtTokenService(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public string CreateToken(AppUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim("name", user.Firstname));
            claims.Add(new Claim("id", user.Id.ToString()));

            foreach (var role in roles) 
            {
                claims.Add(new Claim("roles", role));
            }

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetValue<string>("PR_KEY")));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwtTokenHandler = new JwtSecurityToken(
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.Now.AddDays(100)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtTokenHandler);
        }
    }
}
