using JobSeeker_server.Data;
using JobSeeker_server.Models;
using JobSeeker_server.Models.Dtos;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace JobSeeker_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto model)
        {
            var existingUser = _context.Users.SingleOrDefault(u => u.Email == model.Email);
            if (existingUser != null)
                return BadRequest("User already exists");

            // Hashing the password
            byte[] salt = new byte[24];
            RandomNumberGenerator.Fill(salt);

            byte[] hashedPassword = KeyDerivation.Pbkdf2(
                password: model.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 64
            );

            string passwordHash = Convert.ToBase64String(salt) + Convert.ToBase64String(hashedPassword);

            Company? company = null;
            if (model.Role == "Recruiter" && !string.IsNullOrWhiteSpace(model.CompanyName))
            {
                company = _context.Companies.FirstOrDefault(c => c.Name == model.CompanyName);
                if (company == null)
                {
                    company = new Company { Name = model.CompanyName };
                    _context.Companies.Add(company);
                    _context.SaveChanges(); // Get the company Id
                }
            }

            var newUser = new User
            {
                Email = model.Email,
                PasswordHash = passwordHash,
                Role = model.Role,
                CompanyId = company?.Id
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto model)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == model.Email);
            if (user == null || !VerifyPasswordHash(model.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "L'email ou le mot de passe est invalide." });
            }

            // JWT claims
            var claims = new List<Claim>
            {
                new Claim("userId", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            if (user.Role == "Recruiter" && user.CompanyId.HasValue)
            {
                var company = _context.Companies.FirstOrDefault(c => c.Id == user.CompanyId);
                if (company != null)
                {
                    claims.Add(new Claim("companyId", company.Id.ToString()));
                    claims.Add(new Claim("companyName", company.Name));
                }
            }

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey))
                throw new InvalidOperationException("JWT Key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            byte[] salt = Convert.FromBase64String(storedHash.Substring(0, 32));
            byte[] hash = Convert.FromBase64String(storedHash.Substring(32));

            byte[] computedHash = KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA512,
                10000,
                64
            );

            return computedHash.SequenceEqual(hash);
        }
    }
}