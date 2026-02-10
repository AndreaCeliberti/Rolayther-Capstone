namespace Rolayther.Models.DTOs.Request
{
    public class UpdateMasterPlatformsDto
    {
        public List<Guid> PlatformIds { get; set; } = new();
    }
}
