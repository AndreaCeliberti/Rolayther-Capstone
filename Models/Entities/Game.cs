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
        public string Title { get; set; }
        
        [MaxLength(1000)]
        public string Description { get; set; }
        public string? CoverImageUrl { get; set; }
        public ICollection<Genre> Genres { get; set; }  


    }
}
