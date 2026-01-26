using Rolayther.Models.Entities;

namespace Rolayther.Models.DTOs.Response
{
    public class SessionResponse
    {
        public Guid SessionId { get; set; }
        public string SessionTitle { get; set; } = string.Empty;
        public string? SessionDescription { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Duration { get; set; } = string.Empty;
        public int NumbOfPlayer { get; set; }
        public string? CoverImgUrl { get; set; }
        public Guid MasterId { get; set; }
        public Guid GameId { get; set; }
        public Guid GenreId { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
