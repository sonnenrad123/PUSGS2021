using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartGrid2021Project.Helpers;
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
        public async Task<ActionResult<IEnumerable<WorkRequest>>> GetAllWorkRequests([FromQuery]PaginationDTO paginationDTO)
        {

            try {
                var queryable = _context.WorkRequests.Include(_ => _.AppUser)
                                                     .Include(_ => _.Attachments)
                                                     .Include(_ => _.Equipment)
                                                     .Include(_ => _.StateChangesHistory).AsQueryable();
                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var wrs = await queryable.OrderBy(_ => _.WR_id).Paginate(paginationDTO).ToListAsync();
                return wrs;
                                                  
            }catch(Exception e)
            {

            }
            return NoContent();
        }

        [HttpGet("{id:int}")]
        [Route("GetWorkRequest")]
        public async Task<ActionResult<WorkRequest>> GetWorkRequest([FromQuery]int id)
        {
            return await _context.WorkRequests.Where(_ => _.WR_id == id).Include(_ => _.AppUser)
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
                
                var workRequestfromDb = _context.WorkRequests.Where(_ => _.WR_id == wr.WR_id).SingleOrDefault();
                if (workRequestfromDb == null)
                {
                    workRequestfromDb = new WorkRequest()
                    {
                        TypeOfDocument = wr.TypeOfDocument,
                        Street = wr.Street,
                        Company = wr.Company,
                        CreatedBy = wr.CreatedBy,
                        DateTimeCreated = wr.DateTimeCreated,
                        Details = wr.Details,
                        EmergencyWork = wr.EmergencyWork,
                        EndDateTime = wr.EndDateTime,
                        Notes = wr.Notes,
                        PhoneNo = wr.PhoneNo,
                        Purpose = wr.Purpose,
                        StartDateTime = wr.StartDateTime,
                        StatusOfDocument = wr.StatusOfDocument,
                        
                    };

                    _context.WorkRequests.Add(workRequestfromDb);
                }

                if(!String.IsNullOrWhiteSpace(wr.CreatedBy))
                {
                    var appUser = _context.AppUsers.Where(_ => _.Email.Equals(wr.CreatedBy)).SingleOrDefault();
                    if(appUser != null)
                    {
                        workRequestfromDb.AppUserId = appUser.IdNum;
                        workRequestfromDb.AppUser = appUser;
                    }
                }

                if(wr.Incident != null)
                {
                    workRequestfromDb.IncidentId = wr.Incident.Id;
                    var inc = _context.Incidents.FirstOrDefault(_ => _.Id == wr.Incident.Id);
                    if(inc != null)
                    {
                        workRequestfromDb.Incident = inc;
                        _context.SaveChanges();
                    }
                }

                if (wr.Attachments != null)
                {
                    if (wr.Attachments.Count > 0)
                    {
                        foreach (Attachment d in wr.Attachments)
                        {
                            workRequestfromDb.Attachments.Add(d);
                        }

                    }
                }


                if (wr.StateChangesHistory.Count > 0)
                {
                    workRequestfromDb.StateChangesHistory.Add(wr.StateChangesHistory.First());
                }


                if (wr.Equipment != null)
                {
                    if (wr.Equipment.Count > 0)
                    {
                        foreach (Device d in wr.Equipment)
                        {
                            var fromDbDevice = _context.Devices.Where(_ => _.Id == d.Id).SingleOrDefault();
                            if (fromDbDevice != null)
                            {
                                workRequestfromDb.Equipment.Add(fromDbDevice);
                                
                            }
                            else
                            {
                                workRequestfromDb.Equipment.Add(d);
                            }
                        }
                    }
                }
                
                
                await _context.SaveChangesAsync();
                return Ok();
                    
                
            }catch(Exception e)
            {

            }
            throw new Exception();
        }
    }
}
