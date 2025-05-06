namespace JobSeeker_server.Dtos
{
    public class JobSummaryDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime PostedDate { get; set; }
        public decimal? Salary { get; set; }
    }
}