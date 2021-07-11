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

            var switchingPlans = await _context.SwitchingPlans.
                Include(sp => sp.Equipment).
                Include(sp => sp.StateChanges).
                Include(sp => sp.WorkInstructions).
                Include(sp => sp.Attachments).
                ToListAsync();

            foreach (var item in switchingPlans)
                if (item.Id == switchingPlan.Id)
                    switchingPlan = item;

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

            try
            {
                
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }

            var swpDb = await _context.SwitchingPlans.Where(_ => _.Id == switchingPlan.Id).
                Include(sp => sp.Equipment).
                Include(sp => sp.StateChanges).
                Include(sp => sp.WorkInstructions).
                Include(sp => sp.Attachments).
                Include(sp => sp.User).
                //Include(sp => sp.CustomId).
                //Include(sp => sp.DeviceIds).
                //Include(sp => sp.WorkInstrutcionsString).
                //Include(sp => sp.StateChangesString).
                //Include(sp => sp.AttachmentsString).
                //Include(sp => sp.CreatorEmail).
                SingleOrDefaultAsync();

            if (swpDb != null)
            {
                _context.Entry(swpDb).CurrentValues.SetValues(switchingPlan);
            }

            swpDb.Equipment = new List<Device>();
            string[] deviceIds = switchingPlan.DeviceIds.Split(';');

            foreach (string deviceid in deviceIds)
            {
                if (deviceid == "")
                    continue;
                if (int.TryParse(deviceid, out int idd))
                {
                    Device devtemp = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == idd);
                    if(!swpDb.Equipment.Contains(devtemp))
                        swpDb.Equipment.Add(devtemp);
                }
            }

            swpDb.CreatorEmail = switchingPlan.CreatedBy;
            AppUser creator = await _context.AppUsers.FirstOrDefaultAsync((x) => x.Email == swpDb.CreatorEmail);
            swpDb.User = creator;

            swpDb.StateChanges = new List<StateChangesSP>();
            string[] stateChanges = switchingPlan.StateChangesString.Split(';');
            foreach (string state in stateChanges)
            {
                if (state == "")
                    continue;
                StateChangesSP scp = new StateChangesSP() { State = state, Date = DateTime.Now, Autor = swpDb.CreatorEmail, User = swpDb.User};
                if(!swpDb.StateChanges.Contains(scp))
                    swpDb.StateChanges.Add(scp);
            }

            swpDb.WorkInstructions = new List<WorkInstructionSP>();
            string[] workIns = switchingPlan.WorkInstrutcionsString.Split(';');
            foreach (string ins in workIns)
            {
                if (ins == "")
                    continue;
                string[] split = ins.Split(',');

                Device d = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == int.Parse(split[1].Substring(3)));
                string color = "";
                if(d.Address == swpDb.Street && swpDb.Equipment.Contains(d) && swpDb.StateChanges.ToList()[swpDb.StateChanges.Count - 1].State == "Approve")
                {
                    color = "#64FF64";
                }
                else
                {
                    color = "#FF6464";
                }


                WorkInstructionSP wi = new WorkInstructionSP() { Desc = split[0], Device = split[1], Executed = split[2], Color=color };
                swpDb.WorkInstructions.Add(wi);
            }

            bool gg = false;
            foreach(var item in swpDb.WorkInstructions)
            {
                gg = true;
                if(item.Executed == "Unexecuted")
                {
                    gg = false;
                    break;
                }
            }

            if (gg)
                swpDb.Status = "Completed";

            swpDb.AttachmentsString = "";
            swpDb.Attachments = new List<Attachment>();
            if (switchingPlan.Attachments != null)
            {
                swpDb.Attachments = switchingPlan.Attachments;    
            
            }
            
            //_context.Entry(switchingPlan).CurrentValues.SetValues(switchingPlan);

            //var entry = _context.Entry(switchingPlan);

            //entry.CurrentValues.SetValues(switchingPlan);

            //_context.Database.ExecuteSqlRaw(string.Format("delete from DeviceSwitchingPlan where SwitchingPlansId = {0}", switchingPlan.Id));
            //_context.Database.ExecuteSqlRaw(string.Format("delete from StateChangesSPSwitchingPlan where SwitchingPlansId = {0}", switchingPlan.Id));
            //_context.Database.ExecuteSqlRaw(string.Format("delete from SwitchingPlanWorkInstructionSP where SwitchingPlansId = {0}", switchingPlan.Id));
            


            try
            {
                //_context.Entry(swpDb).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _context.Database.ExecuteSqlRaw(string.Format("delete from WorkInstructionSPs where Id not in (select x.WorkInstructionsId from SwitchingPlanWorkInstructionSP x)"));
                _context.Database.ExecuteSqlRaw(string.Format("delete from StateChangesSPs where Id not in (select x.StateChangesId from StateChangesSPSwitchingPlan x)"));
                //_context.Database.ExecuteSqlRaw(string.Format("delete from Attachments where Id not in (select x.StateChangesId from StateChangesSPSwitchingPlan x)"));

                await _context.SaveChangesAsync();

                _context.Notifications.Add(new Notification() { Desc = "Switching plan has been modified. Id: SWP" + switchingPlan.Id.ToString(), Type = "Info", Icon = "info", Date = DateTime.Now, Color = "#969696", Sp = switchingPlan.Id.ToString() });
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
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
                switchingPlan.Equipment = new List<Device>();
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
                
                switchingPlan.StateChanges = new List<StateChangesSP>();
                string[] stateChanges = switchingPlan.StateChangesString.Split(';');
                foreach(string state in stateChanges)
                {
                    if (state == "")
                        continue;
                    StateChangesSP scp = new StateChangesSP() {State = state, Date = DateTime.Now, Autor = creator.Email, User=creator };
                    switchingPlan.StateChanges.Add(scp);
                }
                
                switchingPlan.WorkInstructions = new List<WorkInstructionSP>();
                string[] workIns = switchingPlan.WorkInstrutcionsString.Split(';');
                foreach(string ins in workIns)
                {
                    if (ins == "")
                        continue;
                    string[] split = ins.Split(',');

                    Device d = await _context.Devices.FirstOrDefaultAsync((x) => x.Id == int.Parse(split[1].Substring(3)));
                    string color = "";
                    if (d.Address == switchingPlan.Street && switchingPlan.Equipment.Contains(d) && switchingPlan.Status == "Approved")
                    {
                        color = "#64FF64";
                    }
                    else
                    {
                        color = "#FF6464";
                    }


                    WorkInstructionSP wi = new WorkInstructionSP() {Desc = split[0], Device = split[1], Executed = split[2], Color=color };
                    switchingPlan.WorkInstructions.Add(wi);
                }

                //switchingPlan.Attachments = new List<Attachment>();
                //attachments...*/

                _context.SwitchingPlans.Add(switchingPlan);
                await _context.SaveChangesAsync();
                _context.Notifications.Add(new Notification() { Desc = "Successfully added new switching plan. Id: SWP" + switchingPlan.Id.ToString(), Type = "Success", Icon = "done", Date = DateTime.Now, Color = "#969696", Sp = switchingPlan.Id.ToString() });
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
