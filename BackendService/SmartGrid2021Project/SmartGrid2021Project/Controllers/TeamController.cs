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

        [HttpGet("{id:int}")]
        [Route("GetTeam")]
        public async Task<ActionResult<Team>> GetTeam([FromQuery] int id)
        {
            return await _context.Teams.Include(_ => _.teamMembers).FirstOrDefaultAsync(_ => _.teamID == id);
        }

        [HttpPost]
        [Route("UpdateTeam")]
        public async Task<ActionResult> UpdateTeam([FromBody] Team team)
        {
            var fromDb = _context.Teams.Where(_ => _.teamID == team.teamID).Include(_ => _.teamMembers).SingleOrDefault();
            if (fromDb != null)
            {
                _context.Entry(fromDb).CurrentValues.SetValues(team);

                foreach (var teamMember in fromDb.teamMembers.ToList())
                {
                    if (!team.teamMembers.Any(c => c.Id == teamMember.Id))
                    {
                        _context.Teams.FirstOrDefault(_ => _.teamID == team.teamID).teamMembers.Remove(teamMember);
                    }
                }

                foreach (var teamMember in team.teamMembers)
                {
                    var existingMember = fromDb.teamMembers.Where(_ => _.Id == teamMember.Id).SingleOrDefault();
                    if (existingMember != null)
                    {
                        _context.Entry(existingMember).CurrentValues.SetValues(teamMember);
                    }
                    else
                    {
                        
                        _context.AppUsers.FirstOrDefault(_ => teamMember.Id == _.Id).UserTeamId = team.teamID;
                        _context.AppUsers.FirstOrDefault(_ => teamMember.Id == _.Id).UserTeam = team;
                    }

                }
                try {
                    _context.SaveChanges();
                    return Ok();
                }catch(Exception e)
                {

                }
                }
            return NotFound();
        }

        [HttpGet]
        [Route("GetAllTeamMembers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllTeamMembers()
        {
            return await _context.AppUsers.Where(_ => _.RoleOfUser.Equals("TEAM_MEMBER") && _.AccountAllowed && _.UserTeam == null).ToListAsync();
        }

        [HttpGet]
        [Route("GetAllTeamMembersForUpdate")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllTeamMembersForUpdate()
        {
            return await _context.AppUsers.Where(_ => _.RoleOfUser.Equals("TEAM_MEMBER") && _.AccountAllowed).ToListAsync();
        }

        [HttpGet("id:int")]
        [Route("GetAllTeamMembersForTeamUpdate")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllTeamMembersForTeamUpdate([FromQuery]int id)
        {
            return await _context.AppUsers.Where(_ => _.RoleOfUser.Equals("TEAM_MEMBER") && _.AccountAllowed && (_.UserTeamId == id || _.UserTeam==null)).ToListAsync();
        }

        [HttpDelete("{id:int}")]
        [Route("DeleteTeam")]
        public async Task<IActionResult> DeleteTeam([FromQuery] int id)
        {
            try
            {
                _context.Teams.Remove(_context.Teams.FirstOrDefault(_ => _.teamID == id));
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {

            }
            return NotFound();
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
