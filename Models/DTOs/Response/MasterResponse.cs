using Rolayther.Models.Entities;

namespace Rolayther.Models.DTOs.Response
{
    public class MasterResponse
    {
        public Guid MasterId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string NickName { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public string? AvatarImgUrl { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? BioMaster { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Game> Games { get; set; }
        public ICollection<Session> Sessions { get; set; }
        public ICollection<Genre> Genres { get; set; }
        public ICollection<Platform> Platform { get; set; }
    }
}
