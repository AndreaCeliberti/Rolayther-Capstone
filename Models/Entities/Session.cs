using Rolayther.Models.Entities;
using Rolayther.Models.Enums;
using Rolayther.Services;
using System.ComponentModel.DataAnnotations;

public class Session : BaseEntity
{
    [Key]
    public Guid SessionId { get; set; }

    [Required]
    [MaxLength(100)]
    public string SessionTitle { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? SessionDescription { get; set; }

    [Required]
    public DateTime ScheduledAt { get; set; }

    [Required]
    [MaxLength(100)]
    public string Duration { get; set; }

    [Required]
    public int NumbOfPlayer { get; set; }

    public string? CoverImgUrl { get; set; }

    public Guid MasterId { get; set; }
    public Master? Master { get; set; }

    public Guid GameId { get; set; }
    public Game? Game { get; set; }

    public Guid GenreId { get; set; }
    public Genre? Genre { get; set; }

    public ICollection<Player> Players { get; set; } = new List<Player>();

    public SessionState CurrentState { get; private set; } = SessionState.Draft;
    public ICollection<SessionStateHistory> StateHistory { get; set; } = new List<SessionStateHistory>();


    // Change status method
    public void ChangeState(SessionState newState, string userId, string role, string? reason = null)
    {
        if (!SessionStateService.CanTransition(CurrentState, newState))
            throw new InvalidOperationException($"Invalid transition from {CurrentState} to {newState}");

        var historyEntry = new SessionStateHistory
        {
            Id = Guid.NewGuid(),
            SessionId = SessionId,
            FromState = CurrentState,
            ToState = newState,
            ChangedByUserId = userId,
            ChangedByRole = role,
            Reason = reason,
            ChangedAtUtc = DateTime.UtcNow
        };

        CurrentState = newState;
        StateHistory.Add(historyEntry);
    }
}
