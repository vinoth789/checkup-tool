
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class Company
    {
    //      public Company()
    //      {
    //          this.Users = new HashSet<UserProfile>();
    //          this.Departments = new HashSet<Department>();
    //      } 
    //     public int Id { get; set; }
    //     public string CompanyName { get; set; }
    //     public string Latitude { get; set; }
    //     public string Longitude { get; set; }
    //     public virtual ICollection<Department> Departments { get; set; }
    //     public virtual ICollection<UserProfile> Users { get; set; }
    //     public List<Survey> Surveys { get; set; }
        

    // }

     public Company()
         {
             this.Users = new HashSet<UserProfile>();
             this.Departments = new HashSet<Department>();
         } 
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public int NumberOfEmployees { get; set; }
        public string TypeOfCompany { get; set; }
        public string OriginOfCompany { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        public virtual ICollection<UserProfile> Users { get; set; }
        public List<Survey> Surveys { get; set; }
        

    }
}