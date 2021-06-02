using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserEmail { get; set; }
        public string UserImage { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string RoleOfUser { get; set; }
        public Team UserTeam { get; set; }
        public int UserTeamID { get; set; }
        public string Address { get; set; }
    }
}
