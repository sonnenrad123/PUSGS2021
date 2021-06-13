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
    public class TeamController : ControllerBase
    {
        private readonly GeneralDBContext _context;
        public TeamController(GeneralDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetAllTeams()
        {
            return await _context.Teams.Include(_ => _.teamMembers).ToListAsync();
        }

        [HttpGet]
        [Route("GetAllTeamMembers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllTeamMembers()
        {
            //return await _context.AppUsers.Where(_ => _.RoleOfUser.Equals("TEAM_MEMBER") && _.AccountAllowed && _.UserTeam == null).ToListAsync();
            return await _context.AppUsers.Where(_ => _.RoleOfUser.Equals("TEAM_MEMBER") && _.UserTeam == null).ToListAsync();
        }

        [HttpPost]
        [Route("CreateNewTeam")]
        public async Task<ActionResult<Device>> CreateNewTeam(Team team)
        {

            try
            {
                Team t = new Team()
                {
                    teamName = team.teamName,
                };
                if (team.teamMembers.Count > 0) {
                    foreach (var x in team.teamMembers)
                    {
                        _context.AppUsers.Find(x.Id).UserTeamId = t.teamID;
                        _context.AppUsers.Find(x.Id).UserTeam = t;
                    }

                }
                _context.Teams.Add(t);
                
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                //return CreatedAtAction("GetDevice", new { id = device.Id }, device);
            }
            throw new Exception();

        }
    }
}
