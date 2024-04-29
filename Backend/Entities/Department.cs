
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class Department
    {
         public Department()
         {
             this.Companies = new HashSet<Company>();
         } 
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        //public Company Company { get; set; }
        public virtual ICollection<Company> Companies { get; set; }
    }
}