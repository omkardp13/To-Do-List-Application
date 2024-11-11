using System.ComponentModel.DataAnnotations;

namespace To_Do_List_API.Models.DTOs
{
    public class UserLoginDto
    {
        [Required]
        [StringLength(100)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

    }
}
