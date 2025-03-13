using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSeeker_server.Data;
using JobSeeker_server.Models;

namespace JobSeeker_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly JobContext _context;

        public JobsController(JobContext context)
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
        public async Task<ActionResult<Job>> CreateJob(Job job)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }

            job.PostedDate = DateTime.UtcNow;

            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = job.Id }, job);
        }
    } 
}

