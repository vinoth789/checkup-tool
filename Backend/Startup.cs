using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using WebApi.Helpers;
using WebApi.Services;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;

namespace WebApi
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var server = _configuration["Database:DBServer"];
            var port = _configuration["Database:DBPort"];
            var user = _configuration["Database:DBUser"];
            var password = _configuration["Database:DBPassword"];
            var database = _configuration["Database:Schema"];

services.AddDbContext<DataContext>(options => options.UseSqlServer(_configuration.GetConnectionString("CheckUp")));
            //services.AddDbContext<DataContext>(options => options.UseSqlServer($"Server={server},{port}; Initial Catalog={database}; User ID={user}; Password={password}"));
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                builder =>
                                {
                                    builder.WithOrigins("http://localhost:4300", "http://localhost:88")
                                    .AllowAnyMethod().WithHeaders("accept", "authorization", "content-type", "origin", "x-custom-header")
                                    .AllowAnyHeader()
                                    .AllowCredentials();
                                });
            });
            //services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyMethod().WithHeaders("accept", "authorization", "content-type", "origin", "x-custom-header").AllowCredentials()));

            // configure strongly typed settings objects
            var appSettingsSection = _configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddMvc();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                var keycloakHostname = _configuration["Keycloak:HostName"];
                var realmName = _configuration["Keycloak:RealmName"];
                x.RequireHttpsMetadata = false;
                x.Authority = keycloakHostname + "/" + realmName;
                x.IncludeErrorDetails = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidIssuer = realmName,
                    ValidateLifetime = true
                };
                x.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = context =>
                   {
                       context.NoResult();
                       context.Response.StatusCode = 401;
                       context.Response.ContentType = "text/plain";
                       return context.Response.WriteAsync(context.Exception.ToString());
                   }
                };
            });

            // configure DI for application services
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IQuestionService, QuestionService>();
            services.AddScoped<ISurveyService, SurveyService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
            // migrate any database changes on startup (includes initial db creation)
            //dataContext.Database.Migrate();
            //PrepDB.PrepPopulation(app);
            //dataContext.CreateDatabaseIfNotExist();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthentication();
            app.UseAuthorization();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            
        }
    }
}
