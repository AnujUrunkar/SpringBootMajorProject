using jwt_tooken_authentication.Models;
using Microsoft.EntityFrameworkCore;

namespace jwt_tooken_authentication.Services
{
    public class ApplicationDbContext:DbContext
    {
       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) { }
      public  DbSet<User> users { get; set; }
      public  DbSet<Website> websites { get; set; }  
      public  DbSet<WebsiteStatus> websitesStatus { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
          .Property(u => u.Role)
          .HasConversion(
              role => role.ToString(), 
              role => Enum.Parse<UserRole>(role) 
          );
            modelBuilder.Entity<User>()
                .HasMany(u => u.Websites)
                .WithOne(w => w.User)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Website>()
                .HasMany(w => w.WebsiteStatuses)
                .WithOne(ws => ws.Website)
                .OnDelete(DeleteBehavior.Cascade); 
        }
        }
    }
