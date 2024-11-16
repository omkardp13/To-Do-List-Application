using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using To_Do_List_API.Database;
using To_Do_List_API.Models.Domain;
using To_Do_List_API.Models.DTOs;
using To_Do_List_API.Repository.Interface;

namespace To_Do_List_API.Repository.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext applicationDbContext;
        public UserRepository(ApplicationDbContext _applicationDbContext)
        {
            this.applicationDbContext = _applicationDbContext;
        }

       

        public async Task<Users> CreateAsync(Users users)
        {
            await applicationDbContext.Users.AddAsync(users);
            await applicationDbContext.SaveChangesAsync();

            return users;
        }

        public async Task<Users> LoginAsync(UserLoginDto users)
        {
            var user = await applicationDbContext.Users
                                           .SingleOrDefaultAsync(u => u.UserName == users.UserName);
            if (user == null)
            {
                
                return null;
            }

            var response = new Users
            {
                
                UserName = user.UserName,
                Email = user.Email
            };


            // Use PasswordHasher to verify the password against the stored hash
            var passwordHasher = new PasswordHasher<Users>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, users.PasswordHash);

            if (result == PasswordVerificationResult.Failed)
            {
                // Password is incorrect
                return null;
            }

            // Successful login, return the user object (without sensitive information like password hash)
            return new Users
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email
            };


        }
    }
}
