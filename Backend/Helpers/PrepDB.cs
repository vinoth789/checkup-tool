using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using WebApi.Entities;
using WebApi.Models;


namespace WebApi.Helpers
{
    public static class PrepDB
     {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope()) 
            {

                SeedData(serviceScope.ServiceProvider.GetService<DataContext>());
            }
        }
        public static void SeedData(DataContext context)
        {
            System.Console.WriteLine("Applying migrations");
            context.Database.Migrate();

         }
     }
}