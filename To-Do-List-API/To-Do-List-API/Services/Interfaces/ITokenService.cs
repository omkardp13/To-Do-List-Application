using To_Do_List_API.Models.Domain;

namespace To_Do_List_API.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(string username);       
    }
}
