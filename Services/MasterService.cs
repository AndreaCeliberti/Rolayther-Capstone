using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.Entities;

namespace Rolayther.Services
{
    public class MasterService : ServiceBase
    {
        public MasterService(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }

        // List Masters
        public async Task<List<Master>> GetAllMasters()
        {
            return await _context.Masters
                .AsNoTracking()
                .Include(m => m.Sessions)
                .Include(m => m.Games)
                //.Include(m => m.Genres)
                .Include(m => m.Platform)
                .Select(m => new Master
                {
                    MasterId = m.MasterId,
                    Name = m.Name,
                    Surname = m.Surname,
                    NickName = m.NickName,
                    Email = m.Email,
                    BioMaster = m.BioMaster,
                    CreatedAt = m.CreatedAt,
                    Sessions = m.Sessions,
                    Games = m.Games,
                    //Genres = m.Genres,
                    Platform = m.Platform
                })
                .ToListAsync();
        }

        // Create Master
        
        public async Task<bool> CreateMaster(MasterRequestDto masterRequestDto)
        {
            var newMaster = new Master
            {
                MasterId = Guid.NewGuid(),
                Name = masterRequestDto.Name,
                Surname = masterRequestDto.Surname,
                NickName = masterRequestDto.NickName,
                DateOfBirth = masterRequestDto.DateOfBirth,
                AvatarImgUrl = masterRequestDto.AvatarImgUrl,
                Email = masterRequestDto.Email,
                BioMaster = masterRequestDto.BioMaster,
                CreatedAt = DateTime.UtcNow,
                Games = new List<Game>(),
                Sessions = new List<Session>(),
                //Genres = new List<Genre>(),
                Platform = new List<Platform>()
            };
            _context.Masters.Add(newMaster);
            return await SaveAsync();
        }

        // Get Master by Id
        public async Task<Master?> GetMasterById(Guid masterId)
        {
            return await _context.Masters
                .AsNoTracking()
                .Include(m => m.Sessions)
                .Include(m => m.Games)
                .Include(m => m.Platform)
                .FirstOrDefaultAsync(m => m.MasterId == masterId);
        }

        // Update Master
        public async Task<bool> UpdateMaster(Guid masterId, MasterRequestDto masterRequestDto)
        {
            var master = await _context.Masters
                .Include(m => m.Sessions)
                .Include(m => m.Games)
                .Include(m => m.Platform)
                .FirstOrDefaultAsync(m => m.MasterId == masterId);

            if (master == null)
                return false;

            master.Name = masterRequestDto.Name;
            master.Surname = masterRequestDto.Surname;
            master.NickName = masterRequestDto.NickName;
            master.DateOfBirth = masterRequestDto.DateOfBirth;
            master.AvatarImgUrl = masterRequestDto.AvatarImgUrl;
            master.Email = masterRequestDto.Email;
            master.BioMaster = masterRequestDto.BioMaster;

            _context.Masters.Update(master);

            return await SaveAsync();
        }



        //Soft delete
        public Task<bool> DeleteMaster(Guid masterId)
        {
            return SoftDeleteAsync<Master>(masterId);
        }
    }
}
