using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JobSeeker_server.Data;
using JobSeeker_server.Models;
using JobSeeker_server.Dtos;

namespace JobSeeker_server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CompanyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }

        // GET: api/Company/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null) return NotFound();
            return company;
        }

        [HttpGet("{id}/details")]
        public async Task<ActionResult<CompanyDetailsDto>> GetCompanyWithJobs(int id)
        {
            var company = await _context.Companies
                .Include(c => c.Jobs)
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null) return NotFound();

            var dto = new CompanyDetailsDto
            {
                Id = company.Id,
                Name = company.Name,
                Description = company.Description,
                Location = company.Location,
                Jobs = company.Jobs.Select(j => new JobSummaryDto
                {
                    Id = j.Id,
                    Title = j.Title,
                    Description = j.Description,
                    PostedDate = j.PostedDate,
                    Salary = j.Salary
                }).ToList()
            };

            return dto;
        }

        // PUT: api/Company/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, Company company)
        {
            if (id != company.Id) return BadRequest();

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // POST: api/Company
        [HttpPost]
        public async Task<ActionResult<Company>> CreateCompany(Company company)
        {
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null) return NotFound();

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}