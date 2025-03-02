using jwt_tooken_authentication.Dtos;
using jwt_tooken_authentication.Models;
using Microsoft.EntityFrameworkCore;

namespace jwt_tooken_authentication.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.users.Include(u => u.Websites).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.users.Include(u => u.Websites).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> AddUserAsync(RegisterDto user)
        {
            UserRole userRole = (UserRole)Enum.Parse(typeof(UserRole), user.Role.ToString());
            User us = new User();
            us.FirstName = user.FirstName;
            us.LastName = user.LastName;
            us.Email = user.Email;
            us.Password = user.Password;
            us.Role = userRole;
            _context.users.Add(us);
            await _context.SaveChangesAsync();
            return us;
        }

        public async Task<User> UpdateUserAsync(int id, RegisterDto user)
        {
            UserRole userRole = (UserRole)Enum.Parse(typeof(UserRole), user.Role.ToString());
            User us = _context.users.FirstOrDefault(u => u.Id == id);
            us.FirstName = user.FirstName;
            us.LastName = user.LastName;
            us.Email = user.Email;
            us.Password = user.Password;
            us.Role = userRole;
            _context.users.Update(us);
            await _context.SaveChangesAsync();
            return us;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
                return false;

            _context.users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
