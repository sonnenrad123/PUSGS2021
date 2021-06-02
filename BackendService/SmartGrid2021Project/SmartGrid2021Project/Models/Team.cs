using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    [Table("Teams")]
    public class Team
    {
        [Key]
        [Required]
        [Column("Team ID")]
        public int teamID { get; set; }
        
        [Required]
        [Column("Team Name", TypeName = "varchar(50)")]
        public string teamName { get; set; }

        public virtual ICollection<AppUser> teamMembers { get; set; }
    }
}
