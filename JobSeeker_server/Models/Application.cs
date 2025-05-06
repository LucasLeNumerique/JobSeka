namespace JobSeeker_server.Models
{
    public class Application
    {
        public int Id { get; set; }

        public int CandidateId { get; set; }
        public User Candidate { get; set; } = null!;

        public int JobId { get; set; }
        public Job Job { get; set; } = null!;

        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}