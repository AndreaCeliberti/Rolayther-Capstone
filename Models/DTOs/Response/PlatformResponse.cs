namespace Rolayther.Models.DTOs.Response
{
    public class PlatformResponse
    {
        public Guid PlatformId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public Guid MasterId { get; set; }
    }
}
