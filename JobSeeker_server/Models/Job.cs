namespace JobSeeker_server.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? Location { get; set; }
        public decimal? Salary { get; set; }
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;

        public int RecruiterId { get; set; }
        public User Recruiter { get; set; } = null!;

        public int? CompanyId { get; set; }
        public Company? Company { get; set; }
    }
}