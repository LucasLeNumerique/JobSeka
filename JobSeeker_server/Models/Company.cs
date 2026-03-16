namespace JobSeeker_server.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? Location { get; set; }

        public ICollection<User> Recruiters { get; set; } = new List<User>();
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}