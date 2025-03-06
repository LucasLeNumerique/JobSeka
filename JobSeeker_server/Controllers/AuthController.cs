using JobSeeker_server.Data;
using JobSeeker_server.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.Security.Cryptography;

namespace JobSeeker_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(UserContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Register a new user
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // Check if the user already exists
            var existingUser = _context.Users.SingleOrDefault(u => u.Email == model.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            // Hash the password
            byte[] salt = new byte[24]; // Ensure 24-byte salt
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt); // Generate 24-byte random salt
            }

            byte[] hashedPassword = KeyDerivation.Pbkdf2(
                password: model.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 64
            );

            // Combine the salt and the hashed password and store them
            string passwordHash = Convert.ToBase64String(salt) + Convert.ToBase64String(hashedPassword);

            // Create a new user object and save it to the database
            var newUser = new User
            {
                Email = model.Email,
                PasswordHash = passwordHash,
                Role = model.Role // Role can be "Candidate" or any other role
            };

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        // Login endpoint
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            // Verify password
            if (!VerifyPasswordHash(model.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            // Generate JWT token
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
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

        // Verify the password by comparing the hash and salt
        private bool VerifyPasswordHash(string password, string storedHash)
        {
            byte[] salt = Convert.FromBase64String(storedHash.Substring(0, 32));
            byte[] hash = Convert.FromBase64String(storedHash.Substring(32));

            Console.WriteLine($"Salt length: {salt.Length} bytes (Base64: {Convert.ToBase64String(salt).Length} chars)");
            Console.WriteLine($"Hash length: {hash.Length} bytes (Base64: {Convert.ToBase64String(hash).Length} chars)");

            byte[] computedHash = KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA512,
                10000,
                64
            );

            Console.WriteLine($"Computed Hash (Base64): {Convert.ToBase64String(computedHash)}");

            return computedHash.SequenceEqual(hash);
        }
    }

    // Register Model for User Registration
    public class RegisterModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "Candidate"; // Default to "Candidate"
    }

    // Login Model for User Login
    public class LoginModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}