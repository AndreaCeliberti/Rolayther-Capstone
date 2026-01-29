using Rolayther.Models.DTOs.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Services;

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
