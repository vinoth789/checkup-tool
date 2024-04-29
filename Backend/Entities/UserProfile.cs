
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    public class UserProfile
    {
        public UserProfile()
         {
             this.Companies = new HashSet<Company>();
         } 
        public int id { get; set; }
        public string created_timestamp { get; set; }
        public string username { get; set; }
        public bool enabled { get; set; }
        public bool email_verified { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string access { get; set; }
        public string role { get; set; }
        public virtual ICollection<Company> Companies { get; set; }
    }
}