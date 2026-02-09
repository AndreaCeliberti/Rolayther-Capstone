using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Models.DTOs.Request;
using Rolayther.Services;
using System.Security.Claims;

namespace Rolayther.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly MasterService _masterService;

        public MasterController(MasterService masterService)
        {
            _masterService = masterService;
        }

        //Get all master

        
        [AllowAnonymous]
        [HttpGet("GetAllMasters")]
        public async Task<IActionResult> GetAllMasters()
        {
            var masters = await _masterService.GetAllMasters();
            if (masters == null || !masters.Any())
            {
                return NotFound("No masters found.");
            }
            return Ok(masters);
        }

        // Create a new master

        [Authorize]
        [HttpPost("CreateMaster")]
        public async Task<IActionResult> CreateMaster(MasterRequestDto masterRequestDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid master data.");
            }
            var isCreated = await _masterService.CreateMaster(masterRequestDto);
            if (isCreated)
            {
                return Ok(new { Message = "Master created Successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to create master." });
            }
        }

        // Get current masters's profile

        
        [Authorize(Roles = "Admin, Master")]
        [HttpGet("Me")]
        public async Task<IActionResult> Me()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrWhiteSpace(email))
                return Unauthorized();

            var master = await _masterService.GetMasterByEmail(email);
            if (master == null)
                return NotFound(new { Message = "Master profile not found for this user." });

            return Ok(new
            {
                master.MasterId,
                master.NickName,
                master.Email
            });
        }

        // Get master by id

        [Authorize]
        [HttpGet("GetMaster/{masterId}")]
        public async Task<IActionResult> GetMasterById(Guid masterId)
        {
            var master = await _masterService.GetMasterById(masterId);

            if (master == null)
                return NotFound(new { Message = "Master not found." });

            return Ok(master);
        }

        // Update master

        [Authorize(Roles = "Admin, Master")]
        [HttpPut("UpdateMaster/{masterId}")]
        public async Task<IActionResult> UpdateMaster(Guid masterId, MasterRequestDto masterRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid master data.");

            var isUpdated = await _masterService.UpdateMaster(masterId, masterRequestDto);

            if (isUpdated)
                return Ok(new { Message = "Master updated successfully." });

            return NotFound(new { Message = "Master not found or update failed." });
        }


        // Delete a master
        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteMaster/{masterId}")]
        public async Task<IActionResult> DeleteMaster(Guid masterId)
        {
            var isDeleted = await _masterService.DeleteMaster(masterId);
            if (isDeleted)
            {
                return Ok(new { Message = "Master deleted successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete master." });
            }
        }
    }
}
