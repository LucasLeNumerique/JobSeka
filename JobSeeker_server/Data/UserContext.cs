using Microsoft.EntityFrameworkCore;
using JobSeeker_server.Models;

namespace JobSeeker_server.Data;

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
}