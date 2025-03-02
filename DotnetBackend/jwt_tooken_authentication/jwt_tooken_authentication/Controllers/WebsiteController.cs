using jwt_tooken_authentication.Dtos;
using jwt_tooken_authentication.Models;
using jwt_tooken_authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace jwt_tooken_authentication.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteController : ControllerBase
    {
        private readonly WebsiteService _websiteService;
        private readonly EmailNotificationService _emailService;
        public WebsiteController(WebsiteService websiteService, EmailNotificationService notificationService)
        {
            _websiteService = websiteService;
            _emailService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWebsites()
        {
            return Ok(await _websiteService.GetAllWebsitesAsync());
        }

        [HttpGet("send-test-email")]
        public IActionResult SendTestEmail()
        {
            _emailService.SendEmail(
                to: "sarpita040@gmail.com",
                subject: "Test Email",
                body: " I am monitoring your website."
            );
            return Ok("Test email sent!");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWebsiteById(int id)
        {
            var website = await _websiteService.GetWebsiteByIdAsync(id);
            if (website == null) return NotFound();
            return Ok(website);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWebsite(websiteDto website)
        {
            var createdWebsite = await _websiteService.AddWebsiteAsync(website);
            return CreatedAtAction(nameof(GetWebsiteById), new { id = createdWebsite.Id }, createdWebsite);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWebsite(int id, websiteDto website)
        {
          //  if (id != website.Id) return BadRequest();
            var updatedWebsite = await _websiteService.UpdateWebsiteAsync(website,id);
            return Ok(updatedWebsite);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWebsite(int id)
        {
            var deleted = await _websiteService.DeleteWebsiteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}

