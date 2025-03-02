using jwt_tooken_authentication.Dtos;
using jwt_tooken_authentication.Models;

namespace jwt_tooken_authentication.Services
{
    public interface IUserService
    {
        public Task<List<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> AddUserAsync(RegisterDto user);
        public Task<User> UpdateUserAsync(int id, RegisterDto user);
        public Task<bool> DeleteUserAsync(int id);
    }
}
