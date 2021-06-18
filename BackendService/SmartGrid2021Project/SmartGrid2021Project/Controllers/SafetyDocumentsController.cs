using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGrid2021Project.Models;

namespace SmartGrid2021Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyDocumentsController : ControllerBase
    {
        private readonly GeneralDBContext _context;

        public SafetyDocumentsController(GeneralDBContext context)
        {
            _context = context;
        }

        // GET: api/SafetyDocuments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SafetyDocument>>> GetSafetyDocuments()
        {
            return await _context.SafetyDocuments
                .Include(x => x.Creator)
                .ToListAsync();
        }

        // GET: api/SafetyDocuments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SafetyDocument>> GetSafetyDocument(int id)
        {
            var safetyDocument = await _context.SafetyDocuments
                .Include(x => x.Creator)
                .FirstOrDefaultAsync((x) => x.Id == id);

            if (safetyDocument == null)
            {
                return NotFound();
            }

            return safetyDocument;
        }

        // PUT: api/SafetyDocuments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSafetyDocument(int id, SafetyDocument safetyDocument)
        {
            if (id != safetyDocument.Id)
            {
                return BadRequest();
            }

            _context.Entry(safetyDocument).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SafetyDocumentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SafetyDocuments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SafetyDocument>> PostSafetyDocument(SafetyDocument safetyDocument)
        {

            AppUser creator = await _context.AppUsers.FirstOrDefaultAsync((x) => x.Email == safetyDocument.CreatorEmail);
            safetyDocument.Creator = creator;

            safetyDocument.Devices = new List<Device>();
            string[] deviceIds = safetyDocument.DeviceIds.Split(';');
            foreach (string deviceid in deviceIds)
            {
                if (int.TryParse(deviceid, out int id))
                {
                    Device devtemp = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == id);
                    safetyDocument.Devices.Add(devtemp);
                }
            }



            _context.SafetyDocuments.Add(safetyDocument);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSafetyDocument", new { id = safetyDocument.Id }, safetyDocument);
        }

        // DELETE: api/SafetyDocuments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SafetyDocument>> DeleteSafetyDocument(int id)
        {
            var safetyDocument = await _context.SafetyDocuments.FindAsync(id);
            if (safetyDocument == null)
            {
                return NotFound();
            }

            _context.SafetyDocuments.Remove(safetyDocument);
            await _context.SaveChangesAsync();

            return safetyDocument;
        }

        private bool SafetyDocumentExists(int id)
        {
            return _context.SafetyDocuments.Any(e => e.Id == id);
        }
    }
}
