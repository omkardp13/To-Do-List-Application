using To_Do_List_API.Models.Domain;
using To_Do_List_API.Models.DTOs;

namespace To_Do_List_API.Repository.Interface
{
    public interface IUserRepository
    {
        Task<Users> CreateAsync(Users users);

        Task<Users> LoginAsync(UserLoginDto users);

    }
}
