namespace WebApi.Models.UserProfiles
{
  public class UserProfileUpdateModel
    {
        public string created_timestamp { get; set; }
        public string username { get; set; }
        public bool enabled { get; set; }
        public bool email_verified { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string access { get; set; }
        public string role { get; set; }
    }
}