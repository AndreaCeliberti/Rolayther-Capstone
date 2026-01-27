using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rolayther.Models.Entities;

namespace Rolayther.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)  : base(options) {}
        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Master> Masters { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 

            modelBuilder.Entity<Game>()
                .HasQueryFilter(g => !g.IsDeleted);

            modelBuilder.Entity<Genre>()
                .HasQueryFilter(g => !g.IsDeleted);

            modelBuilder.Entity<Master>()
                .HasQueryFilter(m => !m.IsDeleted);

            modelBuilder.Entity<Platform>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<Player>()
                .HasQueryFilter(p => !p.IsDeleted);

            modelBuilder.Entity<Session>()
                .HasQueryFilter(s => !s.IsDeleted);

            // aggiungi qui altre entità che useranno la soft delete
        }
    }
}
