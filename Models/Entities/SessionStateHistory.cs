using Rolayther.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Rolayther.Models.Entities
{
    public class SessionStateHistory
    {
        [Key]
        public Guid Id { get; set; }

        public Guid SessionId { get; set; }
        public Session Session { get; set; }

        public SessionState FromState { get; set; }
        public SessionState ToState { get; set; }

        public string ChangedByUserId { get; set; }
        public string ChangedByRole { get; set; }
        public string? Reason { get; set; }

        public DateTime ChangedAtUtc { get; set; }
    }
}
