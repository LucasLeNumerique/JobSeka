namespace JobSeeker_server.Models
{
    public class Job
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public required string Company { get; set; }
        public string? Location { get; set; }
        public decimal? Salary { get; set; }
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;
    }
}