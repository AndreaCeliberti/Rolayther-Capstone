using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.Entities;

namespace Rolayther.Services
{
    public class GameService : ServiceBase
    {
        public GameService(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }

        // Lista Games
        public async Task <List<Game>> GetAllGames()
        {
            return await _context.Games
                .AsNoTracking()
                .Include(ge => ge.Genres)
                .Select(g => new Game
                {
                    GameId = g.GameId,
                    Title = g.Title,
                    Description = g.Description,
                    CoverImageUrl = g.CoverImageUrl,
                    Genres = g.Genres
                })
                .ToListAsync();
        }

        // Create Game
        public async Task<bool> CreateGame(GameRequestDto gameRequestDto)
        {
            var newGame = new Game
            {
                GameId = Guid.NewGuid(),
                Title = gameRequestDto.Title,
                Description = gameRequestDto.Description,
                CoverImageUrl = gameRequestDto.CoverImageUrl,
                Genres = new List<Genre>()
            };
            _context.Games.Add(newGame);

            return await SaveAsync();

        }

        //Soft delete
        public Task<bool> DeleteGame(Guid gameId)
        {
            return SoftDeleteAsync<Game>(gameId);
        }

    }
}
