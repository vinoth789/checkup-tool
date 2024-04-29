using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
     {
        public DataContext (DbContextOptions options) : base (options) { }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Department> Departments{ get; set; }        
        public DbSet<DefaultDepartment> DefaultDepartments{ get; set; }
        public DbSet<FieldOfAction> FieldOfActions{ get; set; }
        public DbSet<Question> Questions{ get; set; }
        public DbSet<SurveyDetail> SurveyDetails{ get; set; }
        public DbSet<SurveyAnswer> SurveyAnswers{ get; set; }
        public DbSet<Survey> Surveys{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Survey>()
            .HasOne(p => p.Company)
            .WithMany(b => b.Surveys);

            modelBuilder.Entity<DefaultDepartment>().HasData(
                new DefaultDepartment { Id = 1, DepartmentName = "Agriculture and crop production" },
                new DefaultDepartment { Id = 2, DepartmentName = "Livestock farming" },
                new DefaultDepartment { Id = 3, DepartmentName = "Horticulture" },
                new DefaultDepartment { Id = 4, DepartmentName = "Vegetable growing" },
                new DefaultDepartment { Id = 5, DepartmentName = "Fruit growing" },
                new DefaultDepartment { Id = 6, DepartmentName = "Wine growing" },
                new DefaultDepartment { Id = 7, DepartmentName = "Forestry" },
                new DefaultDepartment { Id = 8, DepartmentName = "Beekeeping" },
                new DefaultDepartment { Id = 9, DepartmentName = "Inland fishing" },
                new DefaultDepartment { Id = 10, DepartmentName = "Animal breeding" },
                new DefaultDepartment { Id = 11, DepartmentName = "Special crops" }
            );

            modelBuilder.Entity<FieldOfAction>().HasData(
                new FieldOfAction { Id = 1, ActionName = "Irrigation" },
                new FieldOfAction { Id = 2, ActionName = "Plant protection" },
                new FieldOfAction { Id = 3, ActionName = "Logistics" },
                new FieldOfAction { Id = 4, ActionName = "Economics" },
                new FieldOfAction { Id = 5, ActionName = "Ecology" }
            );

            modelBuilder.Entity<Question>().HasData(
                new Question { Id = 1, FieldOfActionId = 1, SurveyQuestion="How do you evaluate your knowledge in digital tools in smart irrigation?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4" },
                new Question { Id = 2, FieldOfActionId = 1, SurveyQuestion="How do you evaluate your knowledge in digital tools in drip irrigation?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4" },
                new Question { Id = 3, FieldOfActionId = 2, SurveyQuestion="How do you evaluate your knowledge in digital tools in forcast on plant protection?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  },
                new Question { Id = 4, FieldOfActionId = 2, SurveyQuestion="How do you evaluate your knowledge in digital tools in sensor based use of growth regulators?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  },
                new Question { Id = 5, FieldOfActionId = 3, SurveyQuestion="How do you evaluate your knowledge in digital tools in Follow-Me applications with AGV's?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  },
                new Question { Id = 6, FieldOfActionId = 3, SurveyQuestion="How do you evaluate your knowledge in digital tools in site planning tools?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  },
                new Question { Id = 7, FieldOfActionId = 4, SurveyQuestion="How do you evaluate your knowledge in digital tools in Field Index?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4" },
                new Question { Id = 8, FieldOfActionId = 4, SurveyQuestion="How do you evaluate your knowledge in digital tools in farm Management system?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4" },
                new Question { Id = 9, FieldOfActionId = 5, SurveyQuestion="How do you evaluate your knowledge in digital tools in Sustainability assessment?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  },
                new Question { Id = 10, FieldOfActionId = 5, SurveyQuestion="How do you evaluate your knowledge in digital tools in Sensor assisted based nitrogen fertilization?", Option1="0", Option2="1", Option3="2", Option4="3", Option5="4"  }
            );

        }
    }
}