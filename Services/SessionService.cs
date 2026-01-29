using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.Entities;
using Rolayther.Models.Enums;
using System.Security.Claims;

namespace Rolayther.Services
{
    public class SessionService : ServiceBase
    {
        public SessionService(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }

        // List Sessions
        public async Task<List<Session>> GetAllSessions()
        {
            return await _context.Sessions
                .AsNoTracking()
                .Include(s => s.Master)
                .Include(s => s.Game)
                .Include(s => s.Genre)
                .Include(s => s.Players)
                .Select(s => new Session
                {
                    SessionId = s.SessionId,
                    SessionTitle = s.SessionTitle,
                    SessionDescription = s.SessionDescription,
                    ScheduledAt = s.ScheduledAt,
                    Duration = s.Duration,
                    NumbOfPlayer = s.NumbOfPlayer,
                    CoverImgUrl = s.CoverImgUrl,
                    Master = s.Master,
                    Game = s.Game,
                    Genre = s.Genre,
                    Players = s.Players
                })
                .ToListAsync();
        }

        // Create Session

        public async Task<bool> CreateSession(SessionRequestDto sessionRequestDto)
        {
            var newSession = new Session
            {
                SessionId = Guid.NewGuid(),
                SessionTitle = sessionRequestDto.SessionTitle,
                SessionDescription = sessionRequestDto.SessionDescription,
                ScheduledAt = sessionRequestDto.ScheduledAt,
                Duration = sessionRequestDto.Duration,
                NumbOfPlayer = sessionRequestDto.NumbOfPlayer,
                CoverImgUrl = sessionRequestDto.CoverImgUrl,
                MasterId = sessionRequestDto.MasterId,
                GameId = sessionRequestDto.GameId,
                GenreId = sessionRequestDto.GenreId,
                Players = new List<Player>()
            };
            _context.Sessions.Add(newSession);
            return await SaveAsync();
        }

        //Soft delete

        public Task<bool> DeleteSession(Guid sessionId)
        {
            return SoftDeleteAsync<Session>(sessionId);
        }

        // Change Session State

        public async Task<bool> ChangeSessionState(Guid sessionId, SessionState newState, string userId, string role, string? reason)
        {
            var session = await _context.Sessions
                .Include(s => s.StateHistory)
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (session == null)
                return false;

            session.ChangeState(newState, userId, role, reason);

            return await SaveAsync();
        }

        // Add player to session
        public async Task<bool> AddPlayerToSession(Guid sessionId, Guid playerId)
        {
            var session = await _context.Sessions
                .Include(s => s.Players)
                .Include(s => s.StateHistory)
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (session == null)
                return false;

            var player = await _context.Players.FindAsync(playerId);
            if (player == null)
                return false;

            try
            {
                session.AddPlayer(player);
            }
            catch
            {
                return false;
            }

            return await SaveAsync();
        }

        // Remove player from session
        public async Task<bool> RemovePlayerFromSession(Guid sessionId, Guid playerId)
        {
            var session = await _context.Sessions
                .Include(s => s.Players)
                .Include(s => s.StateHistory)
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (session == null)
                return false;

            var player = session.Players.FirstOrDefault(p => p.PlayerId == playerId);
            if (player == null)
                return false;

            try
            {
                session.RemovePlayer(player);
            }
            catch
            {
                return false;
            }

            return await SaveAsync();
        }

    }
}
