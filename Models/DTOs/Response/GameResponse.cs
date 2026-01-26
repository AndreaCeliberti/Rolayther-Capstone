namespace Rolayther.Models.DTOs.Response
{
    public class GameResponse
    {
        public Guid GameId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? CoverImageUrl { get; set; }
        public List<Guid> GenresId { get; set; }
    }
}
