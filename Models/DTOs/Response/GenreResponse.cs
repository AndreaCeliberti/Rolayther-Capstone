using Rolayther.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.DTOs.Response
{
    public class GenreResponse
    {
        public Guid GenreId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public Guid MasterId { get; set; }
        public Master? Master { get; set; }
        public Game? Game { get; set; }
    }
}
