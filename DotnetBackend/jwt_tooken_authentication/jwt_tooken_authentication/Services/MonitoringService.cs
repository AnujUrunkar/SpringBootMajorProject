using jwt_tooken_authentication.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
namespace jwt_tooken_authentication.Services
{
    public class MonitoringService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly EmailNotificationService _emailService;

        public MonitoringService(IServiceProvider serviceProvider, EmailNotificationService emailService)
        {
            _serviceProvider = serviceProvider;
            _emailService = emailService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    var websites = await dbContext.websites.Include(u => u.User).Include(w => w.WebsiteStatuses).ToListAsync();

                    foreach (var website in websites)
                    {
                        await CheckWebsiteHealth(website, dbContext);
                    }

                    await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Adjust as needed
                }
            }
        }

        private async Task CheckWebsiteHealth(Website website, ApplicationDbContext dbContext)
        {
            var wbs = new WebsiteStatus();
            var httpClient = new HttpClient();
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            try
            {
                var response = await httpClient.GetAsync(website.Url);
                stopwatch.Stop();
                wbs.ResponseTime = stopwatch.ElapsedMilliseconds;
                wbs.StatuCode = (int)response.StatusCode;
            }
            catch
            {
                wbs.ResponseTime = 0;
                wbs.StatuCode = 0;
                // dbContext.users.Include(w=>w.Websites).FirstOrDefault(u=>u.Id==website.User.Id);    
                // Send email notification if the website is down
                _emailService.SendEmail(
                    to: $"{website.User.Email}", // Replace with actual email
                    subject: $"Website Down: {website.Url}",
                    body: $"The website  ({website.Url}) is down as of {DateTime.UtcNow}."
                );
            }
            finally
            {
                wbs.Website = website;
                website.WebsiteStatuses.Add(wbs);
                dbContext.websitesStatus.Add(wbs);
                await dbContext.SaveChangesAsync();
            }
        }
    }


}


//using jwt_tooken_authentication.Models;
//using Microsoft.EntityFrameworkCore;
//using System.Net.Http;
//using System.Threading;
//using System.Threading.Tasks;
//namespace jwt_tooken_authentication.Services
//{
//    public class MonitoringService : BackgroundService
//    {
//        private readonly IServiceProvider _serviceProvider;
//        private readonly EmailNotificationService _emailService;

//        public MonitoringService(IServiceProvider serviceProvider, EmailNotificationService emailService)
//        {
//            _serviceProvider = serviceProvider;
//            _emailService = emailService;
//        }

//        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
//        {
//            while (!stoppingToken.IsCancellationRequested)
//            {
//                using (var scope = _serviceProvider.CreateScope())
//                {
//                    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
//                    var websites = await dbContext.websites.Include(u => u.User).Include(w => w.WebsiteStatuses).ToListAsync();

//                    foreach (var website in websites)
//                    {
//                        await CheckWebsiteHealth(website, dbContext);
//                    }

//                    await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
//                }
//            }
//        }

//        private async Task CheckWebsiteHealth(Website website, ApplicationDbContext dbContext)
//        {
//            var wbs = new WebsiteStatus();
//            var httpClient = new HttpClient();
//            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

//            try
//            {
//                var response = await httpClient.GetAsync(website.Url);
//                stopwatch.Stop();
//                wbs.ResponseTime = stopwatch.ElapsedMilliseconds;
//                wbs.StatuCode = (int)response.StatusCode;
//                if (wbs.StatuCode >= 400)
//                {
//                    _emailService.SendEmail(
//                   to: $"{website.User.Email}",
//                   subject: $"Website Down: {website.Url}",
//                   body: $"The website  ({website.Url}) is down as of {DateTime.UtcNow}."
//               );
//                }

//            }
//            catch
//            {
//                wbs.ResponseTime = 0;
//                wbs.StatuCode = 0;
//                // dbContext.users.Include(w=>w.Websites).FirstOrDefault(u=>u.Id==website.User.Id); 
//                _emailService.SendEmail(
//                    to: $"{website.User.Email}", // Replace with actual email
//                    subject: $"Website Down: {website.Url}",
//                    body: $"The website  ({website.Url}) is down as of {DateTime.UtcNow}."
//                );
//            }
//            finally
//            {
//                wbs.Website = website;
//                website.WebsiteStatuses.Add(wbs);
//                dbContext.websitesStatus.Add(wbs);
//                await dbContext.SaveChangesAsync();
//            }
//        }
//    }


//}



