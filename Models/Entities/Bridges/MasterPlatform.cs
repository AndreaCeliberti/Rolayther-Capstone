namespace Rolayther.Models.Entities.Bridges
{
    public class MasterPlatform
    {
        public Guid MasterId { get; set; }
        public Master Master { get; set; } = null!;

        public Guid PlatformId { get; set; }
        public Platform Platform { get; set; } = null!;
    }
}
