using Rolayther.Models.Entities;

namespace Rolayther.Models.DTOs.Response
{
    public class PlayerResponse
    {
        public Guid PlayerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string NickName { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public string? AvatarImgUrl { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? BioPlayer { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Session> Sessions { get; set; }

    }
}
