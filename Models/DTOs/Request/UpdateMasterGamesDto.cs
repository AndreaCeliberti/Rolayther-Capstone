namespace Rolayther.Models.DTOs.Request
{
    public class UpdateMasterGamesDto
    {
        public List<Guid> GameIds { get; set; } = new();
    }
}
