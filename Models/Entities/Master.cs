using Microsoft.EntityFrameworkCore;
using Rolayther.Models.Entities.Bridges;
using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.Entities
{
    public class Master : BaseEntity
    {
        [Key]
        public Guid MasterId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string Surname { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string NickName { get; set; } = string.Empty;
        [Required]
        public DateOnly DateOfBirth { get; set; }
        public string? AvatarImgUrl { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(1000)]
        public string? BioMaster { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Session> Sessions { get; set; }

        public ICollection<MasterGame> MasterGames { get; set; } = new List<MasterGame>();
        public ICollection<MasterPlatform> MasterPlatforms { get; set; } = new List<MasterPlatform>();


    }
}
