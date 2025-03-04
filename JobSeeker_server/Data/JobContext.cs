using Microsoft.EntityFrameworkCore;
using JobSeeker_server.Models;

namespace JobSeeker_server.Data;

public class JobContext : DbContext
{
    public JobContext(DbContextOptions<JobContext> options)
        : base(options)
    {
    }

    public DbSet<Job> Jobs { get; set; } = null!;
}