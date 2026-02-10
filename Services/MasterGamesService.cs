using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.Entities;
using Rolayther.Models.Entities.Bridges;

namespace Rolayther.Services
{
    public class MasterGamesService
    {
        private readonly ApplicationDbContext _context;

        public MasterGamesService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> UpdateMasterGames(Guid masterId, List<Guid> gameIds)
        {
            // Verifica che il master esista
            var masterExists = await _context.Masters.AnyAsync(m => m.MasterId == masterId);
            if (!masterExists) return false;

            // (opzionale ma consigliato) verifica che tutti i gameId esistano
            var existingGamesCount = await _context.Games.CountAsync(g => gameIds.Contains(g.GameId));
            if (existingGamesCount != gameIds.Distinct().Count())
                throw new Exception("Uno o più GameId non esistono.");

            // Rimuovo tutti i link esistenti
            var existingLinks = await _context.MasterGames
                .Where(mg => mg.MasterId == masterId)
                .ToListAsync();

            _context.MasterGames.RemoveRange(existingLinks);

            // Inserisco i nuovi link
            var newLinks = gameIds.Distinct().Select(gameId => new MasterGame
            {
                MasterId = masterId,
                GameId = gameId
            });

            await _context.MasterGames.AddRangeAsync(newLinks);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Game>> GetMasterGames(Guid masterId)
        {
            return await _context.MasterGames
                .Where(mg => mg.MasterId == masterId)
                .Select(mg => mg.Game)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
