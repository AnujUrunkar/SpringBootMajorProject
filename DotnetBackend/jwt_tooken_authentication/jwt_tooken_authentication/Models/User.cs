using System.Text.Json.Serialization;

namespace jwt_tooken_authentication.Models
{
    public class User:BaseEntity
    {
        public string FirstName { get; set; }   
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole  Role { get; set; }
        [JsonIgnore]
        public List<Website > Websites { get; set; }   
    }
}
