using Microsoft.AspNetCore.Identity;

namespace Rolayther.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsDeleted { get; set; } = false;
    }
}
