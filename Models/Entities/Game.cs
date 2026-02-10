using Microsoft.EntityFrameworkCore;
using Rolayther.Models.Entities.Bridges;
using System.ComponentModel.DataAnnotations;
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


        public ICollection<Genre> Genres { get; set; } = new List<Genre>();

        public ICollection<MasterGame> MasterGames { get; set; } = new List<MasterGame>();

    }
}