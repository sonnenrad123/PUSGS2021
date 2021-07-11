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
    public class StreetPrioritiesController : ControllerBase
    {
        private readonly GeneralDBContext _context;

        public StreetPrioritiesController(GeneralDBContext context)
        {
            _context = context;
        }

        // GET: api/StreetPriorities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StreetPriority>>> GetStreetPriorities()
        {
            return await _context.StreetPriorities.ToListAsync();
        }
        [HttpGet]
        [Route("AddDummyPriorities")]
        public async Task<ActionResult<IEnumerable<StreetPriority>>> AddDummyPriorities()
        {
            _context.StreetPriorities.Add(new StreetPriority() { Address = "85, Bulevar patrijarha Pavla, Telep, Нови Сад, Novi Sad, Novi Sad City, South Backa Administrative District, Vojvodina, 21102, Serbia", Priority = 10 });
            _context.StreetPriorities.Add(new StreetPriority() { Address = "65, Bulevar patrijarha Pavla, Telep, Нови Сад, Novi Sad, Novi Sad City, South Backa Administrative District, Vojvodina, 21102, Serbia", Priority = 8 });
            _context.StreetPriorities.Add(new StreetPriority() { Address = "30, Bulevar oslobodjenja, Sajmište, Нови Сад, Novi Sad, Novi Sad City, South Backa Administrative District, Vojvodina, 21000, Serbia", Priority = 5 });
            await _context.SaveChangesAsync();
            return await _context.StreetPriorities.ToListAsync();
        }

        // GET: api/StreetPriorities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StreetPriority>> GetStreetPriority(string id)
        {
            var streetPriority = await _context.StreetPriorities.FindAsync(id);

            if (streetPriority == null)
            {
                return NotFound();
            }

            return streetPriority;
        }

        // PUT: api/StreetPriorities/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStreetPriority(string id, StreetPriority streetPriority)
        {
            if (id != streetPriority.Address)
            {
                return BadRequest();
            }

            _context.Entry(streetPriority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _context.Notifications.Add(new Notification() { Desc = "Street priority has been modified.", Type = "Info", Icon = "info", Date = DateTime.Now, Color = "#969696" });
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StreetPriorityExists(id))
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

        // POST: api/StreetPriorities
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<StreetPriority>> PostStreetPriority(StreetPriority streetPriority)
        {
            _context.StreetPriorities.Add(streetPriority);
            try
            {
                await _context.SaveChangesAsync();
                _context.Notifications.Add(new Notification() { Desc = "Successfully added priority to street.", Type = "Success", Icon = "done", Date = DateTime.Now, Color = "#969696"});
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StreetPriorityExists(streetPriority.Address))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStreetPriority", new { id = streetPriority.Address }, streetPriority);
        }

        // DELETE: api/StreetPriorities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StreetPriority>> DeleteStreetPriority(string id)
        {
            var streetPriority = await _context.StreetPriorities.FindAsync(id);
            if (streetPriority == null)
            {
                return NotFound();
            }

            _context.StreetPriorities.Remove(streetPriority);
            await _context.SaveChangesAsync();

            return streetPriority;
        }

        private bool StreetPriorityExists(string id)
        {
            return _context.StreetPriorities.Any(e => e.Address == id);
        }
    }
}
