using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.DTOs.Request
{
    public class RegisterUserDto
    {
        [Required]
        public string FirsName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string NickName { get; set; } = string.Empty;
        [EmailAddress]
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        [Compare(nameof(Email))]
        public string ConfirmEmail { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;
        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
