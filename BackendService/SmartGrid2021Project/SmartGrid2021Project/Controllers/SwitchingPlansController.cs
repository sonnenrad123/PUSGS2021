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
    public class SwitchingPlansController : ControllerBase
    {
        private readonly GeneralDBContext _context;

        public SwitchingPlansController(GeneralDBContext context)
        {
            _context = context;
        }

        // GET: api/SwitchingPlans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SwitchingPlan>>> GetSwitchingPlans()
        {
            return await _context.SwitchingPlans.
                Include(sp => sp.Equipment).
                Include(sp => sp.StateChanges).
                Include(sp => sp.WorkInstructions).
                Include(sp => sp.Attachments).
                ToListAsync();
        }

        // GET: api/SwitchingPlans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchingPlan>> GetSwitchingPlan(int id)
        {
            var switchingPlan = await _context.SwitchingPlans.FindAsync(id);

            if (switchingPlan == null)
            {
                return NotFound();
            }

            return switchingPlan;
        }
        [HttpGet]
        [Route("getDashboardData")]
        public async Task<ActionResult<string>> getDashboardData()
        {
            List<SwitchingPlan> incidents = await _context.SwitchingPlans.ToListAsync();
            int IncidentsCount = incidents.Count();
            int draft = 0, canceled = 0, executing = 0, completed = 0;
            foreach (SwitchingPlan sp in incidents)
            {
                if (sp.Status == "Draft")
                {
                    draft++;
                }
                if (sp.Status == "Canceled")
                {
                    canceled++;
                }
                if (sp.Status == "Executing")
                {
                    executing++;
                }
                if (sp.Status == "Completed")
                {
                    completed++;
                }

            }
            return string.Format("{0};{1};{2};{3};{4}", IncidentsCount, draft, canceled, executing, completed);
        }
        // PUT: api/SwitchingPlans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSwitchingPlan(int id, SwitchingPlan switchingPlan)
        {
            if (id != switchingPlan.Id)
            {
                return BadRequest();
            }

            _context.Entry(switchingPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SwitchingPlanExists(id))
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

        // POST: api/SwitchingPlans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SwitchingPlan>> PostSwitchingPlan(SwitchingPlan switchingPlan)
        {
            try
            {
                switchingPlan.Equipment = new HashSet<Device>();
                string[] deviceIds = deviceIds = switchingPlan.DeviceIds.Split(';');
              
                foreach (string deviceid in deviceIds)   
                {
                    if (deviceid == "")
                        continue;
                    if (int.TryParse(deviceid, out int id))
                    {
                        Device devtemp = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == id);
                        switchingPlan.Equipment.Add(devtemp);
                    }
                }
                
                AppUser creator = await _context.AppUsers.FirstOrDefaultAsync((x) => x.Email == switchingPlan.CreatorEmail);
                switchingPlan.User = creator;
                
                switchingPlan.StateChanges = new HashSet<StateChangesSP>();
                string[] stateChanges = switchingPlan.StateChangesString.Split(';');
                foreach(string state in stateChanges)
                {
                    if (state == "")
                        continue;
                    StateChangesSP scp = new StateChangesSP() {State = state, Date = DateTime.Now, Autor = creator.Email, User=creator };
                    switchingPlan.StateChanges.Add(scp);
                }
                
                switchingPlan.WorkInstructions = new HashSet<WorkInstructionSP>();
                string[] workIns = switchingPlan.WorkInstrutcionsString.Split(';');
                foreach(string ins in workIns)
                {
                    if (ins == "")
                        continue;
                    string[] split = ins.Split(',');

                    /*Device d = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == int.Parse(split[1]));
                    string color = "";
                    if(d.Address == switchingPlan.Street)
                    {
                        color = "#64FF64";
                    }
                    else
                    {
                        color = "#FF6464";
                    }*/


                    WorkInstructionSP wi = new WorkInstructionSP() {Desc = split[0], Device = split[1], Executed = split[2]/*, Color=color*/ };
                    switchingPlan.WorkInstructions.Add(wi);
                }

                //attachments...*/

                _context.SwitchingPlans.Add(switchingPlan);
                await _context.SaveChangesAsync();
            }
            catch(Exception e)
            {

            }

            return CreatedAtAction("GetSwitchingPlan", new { id = switchingPlan.Id }, switchingPlan);
        }

        // DELETE: api/SwitchingPlans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSwitchingPlan(int id)
        {
            var switchingPlan = await _context.SwitchingPlans.FindAsync(id);
            if (switchingPlan == null)
            {
                return NotFound();
            }

            _context.SwitchingPlans.Remove(switchingPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SwitchingPlanExists(int id)
        {
            return _context.SwitchingPlans.Any(e => e.Id == id);
        }
    }
}
