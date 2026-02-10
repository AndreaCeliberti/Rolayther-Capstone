using Microsoft.EntityFrameworkCore;
using Rolayther.Models.Entities.Bridges;
using System.ComponentModel.DataAnnotations;
namespace Rolayther.Models.Entities
{
    public class Platform : BaseEntity
    {
        [Key]
        public Guid PlatformId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(1000)]
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public ICollection<MasterPlatform> MasterPlatforms { get; set; }
    }
}
