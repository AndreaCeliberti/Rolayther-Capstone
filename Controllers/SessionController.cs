using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Models.DTOs.Request;
using Rolayther.Services;
using System.Security.Claims;

namespace Rolayther.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly SessionService _sessionService;

        public SessionController(SessionService sessionService)
        {
            _sessionService = sessionService;
        }

        // Get all sessions 

        [Authorize]
        [AllowAnonymous]
        [HttpGet("GetAllSessions")]
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _sessionService.GetAllSessions();
            if (sessions == null || !sessions.Any())
            {
                return NotFound("No sessions found.");
            }
            return Ok(sessions);
        }

        // Get session by id
        [AllowAnonymous]
        [HttpGet("GetSessionById/{sessionId}")]
        public async Task<IActionResult> GetSessionById(Guid sessionId)
        {
            var session = await _sessionService.GetSessionById(sessionId);
            if (session == null)
            {
                return NotFound("Session not found.");
            }
            return Ok(session);
        }


        // Create a new session

        [Authorize(Roles = "Admin, Master")]
        [HttpPost("CreateSession")]
        public async Task<IActionResult> CreateSession(SessionRequestDto sessionRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid session data.");
            }
            var isCreated = await _sessionService.CreateSession(sessionRequestDto);
            if (isCreated)
            {
                return Ok(new { Message = "Session created Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to create session." });
            }
        }

        // Update a session

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateSession/{sessionId}")]
        public async Task<IActionResult> UpdateSession(Guid sessionId, [FromBody] SessionRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid session data.");

            var ok = await _sessionService.UpdateSession(sessionId, dto);
            if (!ok) return NotFound(new { Message = "Session not found or update failed." });

            return Ok(new { Message = "Session updated successfully." });
        }




        // Change session state

        [HttpPatch("{sessionId}/ChangeState")]
        public async Task<IActionResult> ChangeState(Guid sessionId, [FromBody] ChangeSessionStateDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
                return Unauthorized();

            await _sessionService.ChangeSessionState(sessionId, dto.NewState, userId, role, dto.Reason);

            return Ok("Stato aggiornato correttamente");

        }






        // Join session

        [Authorize]
        [HttpPost("{sessionId}/Join/{playerId}")]
        public async Task<IActionResult> JoinSession(Guid sessionId, Guid playerId)
        {
            var result = await _sessionService.AddPlayerToSession(sessionId, playerId);

            if (!result)
                return BadRequest("Unable to join session");

            return Ok(new { Message = "Player added to session" });
        }

        // Leave session

        [Authorize]
        [HttpPost("{sessionId}/Leave/{playerId}")]
        public async Task<IActionResult> LeaveSession(Guid sessionId, Guid playerId)
        {
            var result = await _sessionService.RemovePlayerFromSession(sessionId, playerId);

            if (!result)
                return BadRequest("Unable to leave session");

            return Ok(new { Message = "Player removed from session" });
        }
// Delete a session

        [Authorize(Roles = "Admin, Master")]
        [HttpDelete("DeleteSession/{sessionId}")]
        public async Task<IActionResult> DeleteSession(Guid sessionId)
        {
            var isDeleted = await _sessionService.DeleteSession(sessionId);
            if (isDeleted)
            {
                return Ok(new { Message = "Session deleted Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete session." });
            }
        }
    }
}
