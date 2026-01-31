using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.Entities
{
    public class Game : BaseEntity
    {
        [Key]
        public Guid GameId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public string? CoverImageUrl { get; set; }

        // FK esplicita verso Master per evitare shadow FK e percorsi cascade impliciti
        public Guid MasterId { get; set; }
        public Master? Master { get; set; }

        public ICollection<Genre> Genres { get; set; } = new List<Genre>();
    }
}