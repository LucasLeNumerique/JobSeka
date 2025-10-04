using JobSeeker_server.Dtos;

public class CompanyDetailsDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Location { get; set; }
    public List<JobSummaryDto> Jobs { get; set; } = new();
}