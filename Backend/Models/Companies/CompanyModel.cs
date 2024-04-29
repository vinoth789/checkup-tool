using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Departments;
using WebApi.Models.Users;
using WebApi.Models.UserProfiles;

namespace WebApi.Models.Companies
{
  public class CompanyModel
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public int NumberOfEmployees { get; set; }
        public string TypeOfCompany { get; set; }
        public string OriginOfCompany { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public virtual ICollection<DepartmentModel> Departments { get; set; }        
        public virtual ICollection<UserProfileModel> Users { get; set; }
        
    }
}