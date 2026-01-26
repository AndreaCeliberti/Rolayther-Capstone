using Microsoft.IdentityModel.Tokens;
using Rolayther.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rolayther.Services
{
    public class JwtTokenService
    {
        private readonly IConfiguration _configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateAccessToken(ApplicationUser user, IList<string> roles)
        {
            //Creo i claims per l'utente, prendendomi le informazioni necessarie come l'ID e l'email
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            };

            //Aggiungo i ruoli dell'utente ai claims, ciclando sulla lista dei ruoli
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            //Recupero la chiave segreta dal file di configurazione
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

            //Creo le credenziali di firma utilizzando la chiave segreta e l'algoritmo HMAC SHA256
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256
            );

            //imposto la scadenza del token 
            var expiration = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:AccessTokenExpirationMinutes"]!));

            //Creo il token JWT utilizzando i claims, le credenziali di firma e la scadenza
            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: signingCredentials
                );

            //Ritorno il token serializzato come stringa
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
