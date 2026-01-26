using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace Rolayther.Models.Entities
{
    public class Genre : BaseEntity
    {
        [Key]
        public Guid GenreId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public Guid MasterId { get; set; }
        public Master? Master { get; set; }
        public Game? Game { get; set; }


    }
}
