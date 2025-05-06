using Microsoft.AspNetCore.Mvc;
using JobSeeker_server.Data;
using JobSeeker_server.Dtos;
using JobSeeker_server.Models;
using Microsoft.EntityFrameworkCore;

namespace JobSeeker_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplicationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/applications
        [HttpPost]
        public async Task<IActionResult> PostApplication([FromBody] ApplicationDto dto)
        {
            if (dto == null || dto.CandidateId == 0 || dto.JobId == 0)
            {
                return BadRequest("Les informations de candidature sont incomplètes.");
            }

            var existingApplication = await _context.Applications
                .FirstOrDefaultAsync(a => a.CandidateId == dto.CandidateId && a.JobId == dto.JobId);

            if (existingApplication != null)
            {
                return BadRequest("Vous avez déjà postulé à cette offre.");
            }

            var application = new Application
            {
                CandidateId = dto.CandidateId,
                JobId = dto.JobId,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow
            };

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            return Ok(application);
        }

        [HttpGet("has-applied")]
        public async Task<IActionResult> HasApplied(int candidateId, int jobId)
        {
            var exists = await _context.Applications
                .AnyAsync(a => a.CandidateId == candidateId && a.JobId == jobId);

            return Ok(new { hasApplied = exists });
        }

        [HttpGet("candidate/{candidateId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetApplicationsByCandidate(int candidateId)
        {
            var applications = await _context.Applications
                .Where(a => a.CandidateId == candidateId)
                .Include(a => a.Job)
                    .ThenInclude(j => j.Company)
                .ToListAsync();

            var result = applications.Select(a => new
            {
                a.Id,
                a.JobId,
                Job = new
                {
                    a.Job.Id,
                    a.Job.Title,
                    Company = a.Job.Company == null ? null : new { a.Job.Company.Name }
                },
                a.CreatedAt
            });

            return Ok(result);
        }
    }
}