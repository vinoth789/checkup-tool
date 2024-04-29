using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Models.Companies;
namespace WebApi.Models.Departments
{
  public class DepartmentModel
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }

    }
}