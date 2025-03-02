using jwt_tooken_authentication.Dtos;
using jwt_tooken_authentication.Models;
using Microsoft.EntityFrameworkCore;

namespace jwt_tooken_authentication.Services
{
    public class WebsiteService
    {
        private readonly ApplicationDbContext _context;
        public WebsiteService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Website>> GetAllWebsitesAsync()
        {
            return await _context.websites.Include(w => w.WebsiteStatuses).ToListAsync();
        }

        public async Task<List<Website>> GetWebsiteByIdAsync(int id)
        {
            return await _context.websites.Include(w => w.WebsiteStatuses).Include(u => u.User).Where(w => w.User.Id == id).ToListAsync();
        }

        public async Task<Website> AddWebsiteAsync(websiteDto wb)
        {
            var wbs = new Website();
            var us = _context.users.Include(u => u.Websites).FirstOrDefault(u => u.Id == wb.id);
            if (us != null)
            {
                wbs.Url = wb.url;
                wbs.User = us;
                us.Websites.Add(wbs);
                _context.websites.Add(wbs);
                await _context.SaveChangesAsync();
                return wbs;
            }
            return null;
        }

        public async Task<Website> UpdateWebsiteAsync(websiteDto website,int id)
        {
            var web = _context.websites.FirstOrDefault(s => s.Id == id);
            web.Url = website.url;

            _context.websites.Update(web);
            await _context.SaveChangesAsync();
            return web;
        }

        public async Task<bool> DeleteWebsiteAsync(int id)
        {
            var website = await _context.websites.FindAsync(id);
            if (website == null)
                return false;

            _context.websites.Remove(website);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

