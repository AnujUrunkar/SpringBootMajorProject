using System.Text.Json.Serialization;

namespace jwt_tooken_authentication.Models
{
    public class Website:BaseEntity
    {
        public string Url { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public List<WebsiteStatus> WebsiteStatuses { get; set; }    
        
    }
}
