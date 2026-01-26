using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace Rolayther.Models.Entities
{
    public class Session
    {
        [Key]
        public Guid SessionId { get; set; }
        [Required]
        [MaxLength(100)]
        public string SessionTitle { get; set; } = string.Empty;
        [MaxLength(1000)]
        public string? SessionDescription { get; set; }
        [Required]
        public DateTime ScheduledAt { get; set; }
        [Required]
        [MaxLength(100)]
        public string Duration { get; set; }
        [Required]
        public int NumbOfPlayer { get; set; }
        public string? CoverImgUrl { get; set; }
        public Guid MasterId { get; set; }
        public Master? Master { get; set; }
        public Guid GameId { get; set; }
        public Game? Game { get; set; }
        public Guid GenreId { get; set; }
        public Genre? Genre { get; set; }

    }
}
