using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using To_Do_List_API.Models.Domain;

namespace To_Do_List_API.Models.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        
    }
}
