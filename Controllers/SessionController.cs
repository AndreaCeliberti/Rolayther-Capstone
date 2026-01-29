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

        // Change session state

        [Authorize(Roles = "Admin, Master")]
        [HttpPost("{sessionId}/ChangeState")]
        public async Task<IActionResult> ChangeState(Guid sessionId, ChangeSessionStateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            var result = await _sessionService.ChangeSessionState(sessionId, dto.NewState, userId, role, dto.Reason);

            if (!result)
                return BadRequest("State change failed");

            return Ok("State updated");
        }

    }
}
