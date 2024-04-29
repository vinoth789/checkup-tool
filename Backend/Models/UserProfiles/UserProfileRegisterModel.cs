using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.UserProfiles
{
    public class UserProfileRegisterModel
    {
        public string created_timestamp { get; set; }
        [Required]
        public string username { get; set; }
        public bool enabled { get; set; }
        public bool email_verified { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        public string email { get; set; }
        public string access { get; set; }
        [Required]
        public string role { get; set; }
    }
}