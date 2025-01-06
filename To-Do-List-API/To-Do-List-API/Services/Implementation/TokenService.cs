using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using To_Do_List_API.Services.Interfaces;

namespace To_Do_List_API.Services.Implementation
{
    public class TokenService : ITokenService
    {
        private const string SecretKey = "dhbddbvkrud345tfkjxbcxhfjdszfhnm"; // Replace with a securely stored key
        private const string Issuer = "yourIssuer";
        private const string Audience = "yourAudience";

        public string GenerateToken(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty", nameof(username));
            }

            // Define claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

            // Generate the signing key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiry
                Issuer = Issuer,
                Audience = Audience,
                SigningCredentials = creds
            };

            // Generate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }
    }
}
