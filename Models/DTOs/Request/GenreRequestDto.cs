using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.DTOs.Request
{
    public class GenreRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string? ImageUrl { get; set; }
        public Guid MasterId { get; set; }
    }
}
