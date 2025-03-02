namespace jwt_tooken_authentication.Models
{
    public class WebsiteStatus:BaseEntity
    {
        public int StatuCode { get; set; }      
        public long ResponseTime { get; set; }  
        public Website Website { get; set; }        

    }
}
