using Rolayther.Models.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Services;

namespace Rolayther.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly GenreService _genreService;

        public GenreController(GenreService genreService)
        {
            _genreService = genreService;
        }

        // Get all genres 

        [Authorize]
        [AllowAnonymous]
        [HttpGet("GetAllGenres")]
        public async Task<IActionResult> GetAllGenres()
        {
            var genres = await _genreService.GetAllGenres();
            if (genres == null || !genres.Any())
            {
                return NotFound("No genres found.");
            }
            return Ok(genres);
        }

        // Create a new genre

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateGenre")]
        public async Task<IActionResult> CreateGenre([FromBody]GenreRequestDto genreRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid genre data.");
            }
            var isCreated = await _genreService.CreateGenre(genreRequestDto);
            if (isCreated)
            {
                return Ok(new { Message = "Genre created Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to create genre." });
            }
        }

        // Delete a genre

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteGenre/{genreId}")]
        public async Task<IActionResult> DeleteGenre(Guid genreId)
        {
            var isDeleted = await _genreService.DeleteGenre(genreId);
            if (isDeleted)
            {
                return Ok(new { Message = "Genre deleted Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete genre." });
            }

        }
    }
}
