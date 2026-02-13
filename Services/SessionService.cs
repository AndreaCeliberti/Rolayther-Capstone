using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.DTOs.Response;
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
             Players = s.Players,

             CurrentState = s.CurrentState
         })
         .ToListAsync();
        }

        // Get Session by Id
        public async Task<Session?> GetSessionById(Guid sessionId)
        {
            return await _context.Sessions
                .AsNoTracking()
                .Include(s => s.Master)
                .Include(s => s.Game)
                .Include(s => s.Genre)
                .Include(s => s.Players)
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);
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

        public async Task<List<Session>> GetSessionsByMasterId(Guid masterId)
        {
            return await _context.Sessions
                .AsNoTracking()
                .Where(s => s.MasterId == masterId)
                .Include(s => s.Game)
                .Include(s => s.Genre)
                .Include(s => s.Players)
                .OrderBy(s => s.ScheduledAt)
                .ToListAsync();
        }

        // Update Session

        public async Task<bool> UpdateSession(Guid sessionId, SessionRequestDto dto)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(s => s.SessionId == sessionId);
            if (session == null) return false;

            session.SessionTitle = dto.SessionTitle;
            session.SessionDescription = dto.SessionDescription;
            session.ScheduledAt = dto.ScheduledAt;
            session.Duration = dto.Duration;
            session.NumbOfPlayer = dto.NumbOfPlayer;
            session.CoverImgUrl = dto.CoverImgUrl;
            session.MasterId = dto.MasterId;
            session.GameId = dto.GameId;
            session.GenreId = dto.GenreId;

            _context.Sessions.Update(session);
            return await SaveAsync();
        }




        // Change Session State

        public async Task ChangeSessionState(Guid sessionId, SessionState newState, string userId, string role, string? reason)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(s => s.SessionId == sessionId);

            if (session is null)
                throw new KeyNotFoundException("Session not found");

            // (se hai regole di autorizzazione, lasciale qui)
            // es: if(role != "Master") throw ...

            session.ChangeState(newState);

            // (se registri uno storico, lascialo qui)
            // _context.SessionStateChanges.Add(new SessionStateChange { ... });

            await _context.SaveChangesAsync();
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
            catch (Exception ex)
            {
                Console.WriteLine($"[AddPlayerToSession] {ex.GetType().Name}: {ex.Message}");
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
  //Soft delete

        public Task<bool> DeleteSession(Guid sessionId)
        {
            return SoftDeleteAsync<Session>(sessionId);
        }
    }
}
