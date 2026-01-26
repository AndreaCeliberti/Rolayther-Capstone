using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.DTOs.Request
{
    public class SessionRequestDto
    {
        [Required]
        public string SessionTitle { get; set; } = string.Empty;
        [Required]
        public string SessionDescription { get; set; } = string.Empty;
        [Required]
        public DateTime ScheduledAt { get; set; }
        [Required]
        public string Duration { get; set; }
        [Required]
        public int NumbOfPlayer { get; set; }
        public string? CoverImgUrl { get; set; }
        public Guid MasterId { get; set; }
        public Guid GameId { get; set; }
        public Guid GenreId { get; set; }
    }
}
