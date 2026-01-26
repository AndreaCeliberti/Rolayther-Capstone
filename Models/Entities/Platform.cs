using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace Rolayther.Models.Entities
{
    public class Platform
    {
        [Key]
        public Guid PlatformId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(1000)]
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public Guid MasterId { get; set; }
        public Master? Master { get; set; }
    }
}
