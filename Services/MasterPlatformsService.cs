using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.Entities;
using Rolayther.Models.Entities.Bridges;

namespace Rolayther.Services
{
    public class MasterPlatformsService
    {
        private readonly ApplicationDbContext _context;
        public MasterPlatformsService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> UpdateMasterPlatforms(Guid masterId, List<Guid> platformIds)
        {
            // Verifica che il master esista
            var masterExists = await _context.Masters.AnyAsync(m => m.MasterId == masterId);
            if (!masterExists) return false;
            // (opzionale ma consigliato) verifica che tutti i platformId esistano
            var existingPlatformsCount = await _context.Platforms.CountAsync(p => platformIds.Contains(p.PlatformId));
            if (existingPlatformsCount != platformIds.Distinct().Count())
                throw new Exception("Uno o più PlatformId non esistono.");
            // Rimuovo tutti i link esistenti
            var existingLinks = await _context.MasterPlatforms
                .Where(mp => mp.MasterId == masterId)
                .ToListAsync();
            _context.MasterPlatforms.RemoveRange(existingLinks);
            // Inserisco i nuovi link
            var newLinks = platformIds.Distinct().Select(platformId => new MasterPlatform
            {
                MasterId = masterId,
                PlatformId = platformId
            });
            await _context.MasterPlatforms.AddRangeAsync(newLinks);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<Platform>> GetMasterPlatforms(Guid masterId)
        {
            return await _context.MasterPlatforms
                .Where(mp => mp.MasterId == masterId)
                .Select(mp => mp.Platform)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
