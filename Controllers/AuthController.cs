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
            [HttpPost("register")]
            public async Task<IActionResult> Register([FromBody] RegisterUserDto registerDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                try
                {
                    bool success = await _authService.RegisterUser(registerDto);
                    if (success)
                        return Ok(new { Message = "Utente registrato con successo" });
                    else
                        return BadRequest(new { Message = "Errore durante la registrazione" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, ex.Message);
                }
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

