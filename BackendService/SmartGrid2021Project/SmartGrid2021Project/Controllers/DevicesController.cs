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
    public class DevicesController : ControllerBase
    {
        private readonly GeneralDBContext _context;
        public DevicesController(GeneralDBContext context)
        {
            _context = context;
        }

        // GET: api/Devices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevices()
        {
            return await _context.Devices.ToListAsync();
        }

        [HttpGet]
        [Route("GetMax")]
        public async Task<ActionResult<int>> GetMaxID()
        {
            var maxID = -1;
            try
            {
                maxID = await _context.Devices.MaxAsync((x) => x.Id);
            }
            catch(Exception e)
            {
                maxID = -1;
            }
            return maxID;
        }

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Device>> GetDevice(int id)
        {
            var device = await _context.Devices.FindAsync(id);

            if (device == null)
            {
                return NotFound();
            }

            return device;
        }

        // PUT: api/Devices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevice(int id, Device device)
        {
            if (id != device.Id)
            {
                return BadRequest();
            }

            _context.Entry(device).State = EntityState.Modified;
            _context.Notifications.Add(new Notification() { Desc = "Successfully modified device. Id:" + id.ToString(), Type = "Success", Icon = "done", Date = DateTime.Now, Color = "#969696" });

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeviceExists(id))
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

        // POST: api/Devices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Device>> PostDevice(Device device)
        {

            try
            {
                _context.Devices.Add(device);
                await _context.SaveChangesAsync();

                _context.Notifications.Add(new Notification() {Desc="Successfully added new device.", Type="Success", Icon="done", Date=DateTime.Now, Color = "#969696" });
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDevice", new { id = device.Id }, device);
            }
            catch(Exception e)
            {
                return CreatedAtAction("GetDevice", new { id = device.Id }, device);
            }

           
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Device>> DeleteDevice(int id)
        {
            var device = await _context.Devices.FindAsync(id);
            if (device == null)
            {
                return NotFound();
            }

            _context.Devices.Remove(device);
            await _context.SaveChangesAsync();

            return device;
        }

        private bool DeviceExists(int id)
        {
            return _context.Devices.Any(e => e.Id == id);
        }
    }
}
