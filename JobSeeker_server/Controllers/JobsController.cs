using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSeeker_server.Models;
using JobSeeker_server.Data;
using JobSeeker_server.Dtos;

namespace JobSeeker_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Use ApplicationDbContext

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET All
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();
            return Ok(jobs);
        }

        // GET by Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            var job = await _context.Jobs.FindAsync(id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        [HttpPost]
        public async Task<ActionResult<Job>> CreateJob([FromBody] JobDto jobDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new { message = "Validation failed", errors });
            }

            // Set the posted date
            var recruiter = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == jobDto.RecruiterId && u.Role == "Recruiter");

            if (recruiter == null)
            {
                return BadRequest("Recruiter not found or not valid.");
            }

            var job = new Job
            {
                Title = jobDto.Title,
                Description = jobDto.Description,
                Location = jobDto.Location,
                Salary = jobDto.Salary,
                RecruiterId = recruiter.Id,
                PostedDate = DateTime.UtcNow,
                CompanyId = recruiter.CompanyId
            };

            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
        }
    } 
}
