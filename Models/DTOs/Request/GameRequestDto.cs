using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.DTOs.Request
{
    public class GameRequestDto

    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string? CoverImageUrl { get; set; }
    }
}
