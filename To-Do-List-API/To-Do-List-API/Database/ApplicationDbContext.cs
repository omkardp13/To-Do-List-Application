using Microsoft.EntityFrameworkCore;
using To_Do_List_API.Models.Domain;

namespace To_Do_List_API.Database
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }

        public DbSet<Users> Users { get; set; }

        public DbSet<Tasks> Tasks { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks) // Ensure Users entity has a Tasks collection if needed
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
