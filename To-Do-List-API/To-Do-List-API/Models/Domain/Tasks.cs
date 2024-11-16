using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace To_Do_List_API.Models.Domain
{
    public class Tasks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskId { get; set; }

        [Required]
        public int UserId { get; set; }


        [ForeignKey("UserId")]
        public Users ?User { get; set; } // Navigation property for the relationship with the User entity

        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public bool IsCompleted { get; set; } = false; // Default value is false (not completed)

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Default value is the current date and time
    }
}
