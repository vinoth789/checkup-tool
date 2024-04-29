using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using WebApi.Models.Companies;

namespace WebApi.Models.Departments
{
    public class RegisterDepartmentModel
    {
        
        [Required]
        public string DepartmentName { get; set; }

    }
}