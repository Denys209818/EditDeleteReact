using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Collections.Generic;
using System.IO;
using ToastrWithAuthorization.Data;
using ToastrWithAuthorization.Data.Identity;
using ToastrWithAuthorization.Mapper;
using ToastrWithAuthorization.Models;
using ToastrWithAuthorization.Services;
using ToastrWithAuthorization.Validators;

namespace ToastrWithAuthorization
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddNewtonsoftJson(config => {
                config.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                config.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                config.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
                });
            

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "frontend/build";
            });

            services.AddDbContext<MyDbContext>((DbContextOptionsBuilder builder) => {
                builder.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<AppUser, AppRole>((IdentityOptions opt) => {
                opt.Password.RequireDigit = false;
                opt.Password.RequiredLength = 6;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<MyDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<IJwtTokenService, JwtTokenService>();

            services.AddSwaggerGen((SwaggerGenOptions opt) => {
                opt.SwaggerDoc("v1", new OpenApiInfo { Version= "v1", Title="ToastrWithAuthorization" });

                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description ="Swagger description",
                    Scheme = "bearer",
                    Type = SecuritySchemeType.Http
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme 
                        {
                            Reference = new OpenApiReference { 
                                Type = ReferenceType.SecurityScheme,
                                Id = "bearer"
                            }
                        },
                        new List<string>()
                    }
                    
                });

            });

            services.AddFluentValidation(conf =>
            conf.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddAutoMapper(typeof(MyAutoMapper));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI((SwaggerUIOptions opts) => {
                    opts.SwaggerEndpoint("/swagger/v1/swagger.json", "My swagger");
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            string dir = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);
            app.UseStaticFiles(new StaticFileOptions { 
                FileProvider = new PhysicalFileProvider(dir),
                RequestPath = "/images"
            });
            app.UseStaticFiles();

            app.SeedAll();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "frontend";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
