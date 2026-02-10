    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Rolayther.Models.DTOs.Request;
    using Rolayther.Services;

namespace Rolayther.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterGamesController : ControllerBase
    {
        private readonly MasterGamesService _service;

        public MasterGamesController(MasterGamesService service)
        {
            _service = service;
        }

        // GET /api/MasterGames/{masterId}
        [Authorize(Roles = "Admin, Master")]
        [HttpGet("{masterId}")]
        public async Task<IActionResult> GetMasterGames(Guid masterId)
        {
            var games = await _service.GetMasterGames(masterId);
            return Ok(games);
        }

        // PUT /api/MasterGames/{masterId}
        [Authorize(Roles = "Admin, Master")]
        [HttpPut("{masterId}")]
        public async Task<IActionResult> UpdateMasterGames(Guid masterId, [FromBody] UpdateMasterGamesDto dto)
        {
            if (dto == null || dto.GameIds == null) return BadRequest("Dati mancanti.");

            var ok = await _service.UpdateMasterGames(masterId, dto.GameIds);
            if (!ok) return NotFound("Master non trovato.");

            return Ok(new { Message = "Giochi del master aggiornati correttamente." });
        }
    }
}
