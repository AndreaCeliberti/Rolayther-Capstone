using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.Entities;

namespace Rolayther.Services
{
    public class PlatformService : ServiceBase
    {
        public PlatformService(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }

        // List Platforms   
        public async Task<List<Platform>> GetAllPlatforms()
        {
            return await _context.Platforms
                .AsNoTracking()
                .Select(p => new Platform
                {
                    PlatformId = p.PlatformId,
                    Name = p.Name,
                    Description = p.Description,
                    LogoUrl = p.LogoUrl
                })
                .ToListAsync();
        }

        // Create Platform
        public async Task<bool> CreatePlatform(PlatformRequestDto platformRequestDto)
        {
            var newPlatform = new Platform
            {
                PlatformId = Guid.NewGuid(),
                Name =  platformRequestDto.Name,
                Description = platformRequestDto.Description,
                LogoUrl = platformRequestDto.LogoUrl,
                MasterId = platformRequestDto.MasterId
            };
            _context.Platforms.Add(newPlatform);
            return await SaveAsync();
        }

        //Soft delete

        public Task<bool> DeletePlatform(Guid platformId)
        {
            return SoftDeleteAsync<Platform>(platformId);
        }
    }
}
