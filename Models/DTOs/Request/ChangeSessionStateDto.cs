using Rolayther.Models.Enums;

namespace Rolayther.Models.DTOs.Request
{
    public class ChangeSessionStateDto
    {
        public SessionState NewState { get; set; }
        public string? Reason { get; set; }
    }
}
