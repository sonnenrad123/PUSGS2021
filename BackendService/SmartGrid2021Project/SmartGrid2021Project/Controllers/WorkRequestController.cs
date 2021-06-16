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
    public class WorkRequestController : ControllerBase
    {
        private readonly GeneralDBContext _context;

        public WorkRequestController(GeneralDBContext generalDBContext)
        {
            _context = generalDBContext;
        }

        [HttpGet]
        [Route("GetAllWorkRequests")]
        public async Task<ActionResult<IEnumerable<WorkRequest>>> GetAllWorkRequests()
        {
            try {
                return await _context.WorkRequests/*.Include(_ => _.AppUser)*/
                                                  .Include(_ => _.Attachments)
                                                  .Include(_ => _.Equipment)
                                                  .Include(_ => _.StateChangesHistory)
                                                  .ToListAsync();
            }catch(Exception e)
            {

            }
            return NoContent();
        }

        [HttpGet("{id:int}")]
        [Route("GetWorkRequest")]
        public async Task<ActionResult<WorkRequest>> GetWorkRequest([FromQuery]int id)
        {
            return await _context.WorkRequests.Where(_ => _.WR_id == id)/*.Include(_ => _.AppUser)*/
                                               .Include(_ => _.Attachments)
                                               .Include(_ => _.Equipment)
                                               .Include(_ => _.StateChangesHistory)
                                               .SingleOrDefaultAsync();
            return Ok();
        }

       
        [HttpPost]
        [Route("CreateNewWorkRequest")]
        public async Task<ActionResult<WorkRequest>> CreateNewWorkRequest(WorkRequest wr)
        {
            
            try
            {
                
                var fromDb = _context.WorkRequests.Where(_ => _.WR_id == wr.WR_id).SingleOrDefault();
                if (fromDb == null)
                {
                    WorkRequest workRequest = new WorkRequest()
                    {
                        //Attachments = wr.Attachments,
                        TypeOfDocument = wr.TypeOfDocument,
                        Street = wr.Street,
                        Company = wr.Company,
                        CreatedBy = wr.CreatedBy,
                        DateTimeCreated = wr.DateTimeCreated,
                        Details = wr.Details,
                        EmergencyWork = wr.EmergencyWork,
                        EndDateTime = wr.EndDateTime,
                        //Equipment = wr.Equipment,
                        Notes = wr.Notes,
                        PhoneNo = wr.PhoneNo,
                        Purpose = wr.Purpose,
                        StartDateTime = wr.StartDateTime,
                        //StateChangesHistory = wr.StateChangesHistory,
                        StatusOfDocument = wr.StatusOfDocument,
                           
                    };
                        
                    _context.WorkRequests.Add(workRequest);
                    if(wr.Equipment.Count > 0)
                    {
                        foreach(Device d in wr.Equipment)
                        {
                            _context.Devices.Where(_ => _.Id == d.Id).SingleOrDefault().WorkRequestId = workRequest.WR_id;
                            _context.Devices.Where(_ => _.Id == d.Id).SingleOrDefault().WorkRequest = workRequest;
                        }
                    }

                    if (wr.Attachments.Count > 0)
                    {
                        foreach (Attachment d in wr.Attachments)
                        {
                            _context.Attachments.Add(d);
                            _context.SaveChanges();
                        }
                            foreach (Attachment d in wr.Attachments)
                        {
                            _context.Attachments.Where(_ => _.Id == d.Id).SingleOrDefault().WorkRequestId = workRequest.WR_id;
                            _context.Attachments.Where(_ => _.Id == d.Id).SingleOrDefault().WorkRequest = workRequest;
                        }
                    }

                    if (wr.StateChangesHistory.Count > 0)
                    {
                        foreach (WRStateChange d in wr.StateChangesHistory)
                        {
                            _context.WRStateChange.Add(d);
                            _context.SaveChanges();
                        }
                            foreach (WRStateChange d in wr.StateChangesHistory)
                        {
                            _context.WRStateChange.Where(_ => _.WRSC_Id == d.WRSC_Id).SingleOrDefault().WorkRequestId = workRequest.WR_id;
                            _context.WRStateChange.Where(_ => _.WRSC_Id == d.WRSC_Id).SingleOrDefault().WorkRequest = workRequest;
                        }
                    }

                    await _context.SaveChangesAsync();
                    return Ok();
                    }
                
            }catch(Exception e)
            {

            }
            throw new Exception();
        }
    }
}
