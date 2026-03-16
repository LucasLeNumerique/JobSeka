namespace JobSeeker_server.Models.Dtos
{
    public class RegisterDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "Candidate";
        public string? CompanyName { get; set; }
    }
}