using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToastrWithAuthorization.Constants;
using ToastrWithAuthorization.Data.Identity;

namespace ToastrWithAuthorization.Services
{
    public static class DbSeeder
    {
        public static void SeedAll(this IApplicationBuilder app) 
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()) 
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                if (!roleManager.Roles.Any()) 
                {
                    roleManager.CreateAsync(new AppRole { 
                        Name = Roles.Admin
                    }).Wait();
                    roleManager.CreateAsync(new AppRole { 
                        Name = Roles.User
                    }).Wait();
                }
            }
        }
    }
}
