﻿namespace jwt_tooken_authentication.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }=DateTime.Now;
        public DateTime UpdateTime { get; set; }= DateTime.Now; 
    }
}
