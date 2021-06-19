using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGrid2021Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        GeneralDBContext _context;

        public MapController(GeneralDBContext dBContext)
        {
            _context = dBContext;
        }

        [HttpGet]
        [Route("GetActuallyIncidents")]
        public async Task<ActionResult<IEnumerable<Incident>>> GetActuallyIncidents(){

            return await _context.Incidents.Where(inc => inc.Status.ToUpper() != IncidentStatus.Submitted.ToString().ToUpper())
                .Include(incident => incident.Devices)
                .Include(incident => incident.User)
                .Include(Incident => Incident.WorkRequests)
                .ToListAsync();
        }    
    }
}
