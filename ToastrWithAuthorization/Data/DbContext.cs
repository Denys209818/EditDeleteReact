using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToastrWithAuthorization.Data.Configuration;
using ToastrWithAuthorization.Data.Identity;

namespace ToastrWithAuthorization.Data
{
    public class MyDbContext : IdentityDbContext<AppUser, AppRole, long, IdentityUserClaim<long
        >, AppUserRole, IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public MyDbContext(DbContextOptions opts) : base(opts)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Identity
                builder.ApplyConfiguration(new IdentityConfiguration());
            #endregion
        }
    }
}
