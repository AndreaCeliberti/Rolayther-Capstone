using Rolayther.Models.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Services;

namespace Rolayther.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService _playerService;

        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        // Get all players

        [Authorize]
        [Authorize(Roles = "Admin, Master")]
        [HttpGet("GetAllPlayers")]
        public async Task<IActionResult> GetAllPlayers()
        {
            var players = await _playerService.GetAllPlayers();
            if (players == null || !players.Any())
            {
                return NotFound("No players found.");
            }
            return Ok(players);
        }

        // Create a new player

        [AllowAnonymous]
        [HttpPost("CreatePlayer")]
        public async Task<IActionResult> CreatePlayer(PlayerRequestDto playerRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid player data.");
            }
            var isCreated = await _playerService.CreatePlayer(playerRequestDto);
            if (isCreated)
            {
                return Ok(new { Message = "Player created Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to create player." });
            }
        }

        // Get player by id

        [Authorize (Roles = "Admin, Player, Master")]
        [HttpGet("GetPlayer/{playerId}")]
        public async Task<IActionResult> GetPlayerById(Guid playerId)
        {
            var player = await _playerService.GetPlayerById(playerId);

            if (player == null)
                return NotFound(new { Message = "Player not found." });

            return Ok(player);
        }

        // Update player

        [Authorize(Roles = "Admin, Player")]
        [HttpPut("UpdatePlayer/{playerId}")]
        public async Task<IActionResult> UpdatePlayer(Guid playerId, PlayerRequestDto playerRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid player data.");

            var isUpdated = await _playerService.UpdatePlayer(playerId, playerRequestDto);

            if (isUpdated)
                return Ok(new { Message = "Player updated successfully." });

            return NotFound(new { Message = "Player not found or update failed." });
        }


        // Delete a player

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeletePlayer/{playerId}")]
        public async Task<IActionResult> DeletePlayer(Guid playerId)
        {
            var isDeleted = await _playerService.DeletePlayer(playerId);
            if (isDeleted)
            {
                return Ok(new { Message = "Player deleted Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete player." });
            }
        }
    }
}
