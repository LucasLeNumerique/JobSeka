namespace JobSeeker_server.Dtos
{
    public class JobDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? Location { get; set; }
        public decimal? Salary { get; set; }
        public int RecruiterId { get; set; }
    }
}