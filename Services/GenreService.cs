using Microsoft.EntityFrameworkCore;
using Rolayther.Data;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.Entities;

namespace Rolayther.Services
{
    public class GenreService : ServiceBase
    {
        public GenreService(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }

        // List genres
        public async Task <List<Genre>> GetAllGenres()
        {
            return await _context.Genres
                .AsNoTracking()
                .Select(g => new Genre
                {
                    GenreId = g.GenreId,
                    Name = g.Name,
                    Description = g.Description,
                    ImageUrl = g.ImageUrl,
                    
                })
                .ToListAsync();
        }

        // Create genre
        public async Task<bool> CreateGenre(GenreRequestDto genreRequestDto)
        {
            var newGenre = new Genre
            {
                GenreId = Guid.NewGuid(),
                Name = genreRequestDto.Name,
                Description = genreRequestDto.Description,
                ImageUrl = genreRequestDto.ImageUrl,
                
            };
            _context.Genres.Add(newGenre);
            return await SaveAsync();
        }

        //Soft delete
        public Task<bool> DeleteGenre(Guid genreId)
        {
            return SoftDeleteAsync<Genre>(genreId);
        }
    }
}
