using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rolayther.Models.DTOs.Request;
using Rolayther.Models.DTOs.Response;
using Rolayther.Services;

namespace Rolayther.Controllers
{
   
        [Route("api/[controller]")]
        [ApiController]
        public class AuthController : ControllerBase
        {
            private readonly AuthService _authService;

            public AuthController(AuthService authService)
            {
                _authService = authService;
            }

        // ================== REGISTER ==================
        [HttpPost("register-player")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterPlayer(PlayerRequestDto dto)
        {
            var result = await _authService.RegisterPlayerAsync(dto);
            if (!result)
                return BadRequest(new { Message = "Registrazione player fallita" });

            return Ok(new { Message = "Player registrato con successo" });
        }

        [HttpPost("register-master")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterMaster(MasterRequestDto dto)
        {
            var result = await _authService.RegisterMasterAsync(dto);
            if (!result)
                return BadRequest(new { Message = "Registrazione master fallita" });

            return Ok(new { Message = "Master registrato con successo" });
        }


        // ================== LOGIN ==================
        [HttpPost("login")]
            public async Task<IActionResult> Login([FromBody] LoginUserDto loginDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    AuthResponseDto authResponse = await _authService.Login(loginDto);

                    if (string.IsNullOrEmpty(authResponse.AccessToken))
                        return Unauthorized(new { Message = "Email o password errate" });

                    return Ok(authResponse);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }

            // ================== REFRESH TOKEN ==================
            [HttpPost("refresh")]
            public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto refreshDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    AuthResponseDto authResponse = await _authService.RefreshTokenAsync(refreshDto.RefreshToken);
                    return Ok(authResponse);
                }
                catch (UnauthorizedAccessException)
                {
                    return Unauthorized(new { Message = "Refresh token non valido o scaduto" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }

            // ================== LOGOUT ==================
            //[Authorize]
            [HttpPost("logout")]
            public async Task<IActionResult> Logout(LogoutDto logout)
            {
                try
                {

                    await _authService.Logout(logout.RefreshToken);

                    return Ok(new { Message = "Logout effettuato con successo" });
                }
                catch (UnauthorizedAccessException)
                {
                    return Unauthorized(new { Message = "Refresh token non valido o scaduto" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }

