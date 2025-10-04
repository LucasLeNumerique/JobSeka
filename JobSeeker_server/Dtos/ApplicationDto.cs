namespace JobSeeker_server.Dtos
{
    public class ApplicationDto
    {
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public string? Message { get; set; }
        public DateTime? CreatedAt { get; set; }

    }
}