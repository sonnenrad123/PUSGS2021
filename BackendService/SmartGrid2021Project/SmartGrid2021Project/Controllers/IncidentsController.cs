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
    public class IncidentsController : ControllerBase
    {
        private readonly GeneralDBContext _context;

        public IncidentsController(GeneralDBContext context)
        {
            _context = context;
        }

        // GET: api/Incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents()
        {
           return await _context.Incidents
                .Include(incident => incident.Devices)
                .Include(incident => incident.User)
                .Include(incident => incident.IncidentCrew)
                .ToListAsync();
        }


        // GET: api/Incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var incident = await _context.Incidents
                                .Include(incident => incident.Devices)
                                .Include(incident => incident.User)
                                .Include(incident => incident.IncidentCrew)
                                  .FirstOrDefaultAsync((x) => x.Id == id);

            if (incident == null)
            {
                return NotFound();
            }

            return incident;
        }

        // PUT: api/Incidents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncident(int id, Incident incident)
        {
            if (id != incident.Id)
            {
                return BadRequest();
            }

            incident.Devices = new List<Device>();
            string[] deviceIds = incident.DeviceIds.Split(';');
            foreach (string deviceid in deviceIds)
            {
                if (int.TryParse(deviceid, out int idd))
                {
                    Device devtemp = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == idd);
                    incident.Devices.Add(devtemp);
                }
            }
           // AppUser creator = await _context.AppUsers.FirstOrDefaultAsync((x) => x.Id == incident.id);
            Team incidentCrew = await _context.Teams.FirstOrDefaultAsync((x) => x.teamID == incident.CrewId);
            incident.IncidentCrew = incidentCrew;
            // incident.User = creator;

            _context.Database.ExecuteSqlRaw(string.Format("delete from DeviceIncident where IncidentsId = {0}", incident.Id));
           


            _context.Entry(incident).State = EntityState.Modified;
           
            try
            {
                await _context.SaveChangesAsync();
            }
            
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch(Exception e)
            {

            }

            return NoContent();
        }

        // POST: api/Incidents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Incident>> PostIncident(Incident incident)
        {
            try
            {
                incident.Devices = new List<Device>();
                string[] deviceIds = incident.DeviceIds.Split(';');
                foreach(string deviceid in deviceIds)
                {
                    if(int.TryParse(deviceid,out int id))
                    {
                        Device devtemp = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == id);
                        incident.Devices.Add(devtemp);
                    }
                }
                AppUser creator = await _context.AppUsers.FirstOrDefaultAsync((x) => x.Email == incident.CreatorEmail);
                Team incidentCrew = await _context.Teams.FirstOrDefaultAsync((x) => x.teamID == incident.CrewId);
                incident.IncidentCrew = incidentCrew;
                incident.User = creator;
                _context.Incidents.Add(incident);
                await _context.SaveChangesAsync();

                _context.Notifications.Add(new Notification() { Desc = "Successfully added new incident. Id: INC" + incident.Id.ToString(), Type = "Success", Icon = "done", Date = DateTime.Now, Color = "#969696", Inc = incident.Id.ToString() });
                await _context.SaveChangesAsync();

            }
            catch(Exception e)
            {

            }

            return CreatedAtAction("GetIncident", new { id = incident.Id }, incident);
        }

        // DELETE: api/Incidents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Incident>> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound();
            }

            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();

            return incident;
        }

        private bool IncidentExists(int id)
        {
            return _context.Incidents.Any(e => e.Id == id);
        }
    }
}
