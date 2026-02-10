namespace Rolayther.Models.Entities.Bridges
{
    public class MasterGame
    {
        public Guid MasterId { get; set; }
        public Master Master { get; set; } = null!;

        public Guid GameId { get; set; }
        public Game Game { get; set; } = null!;
    }
}
