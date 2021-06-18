using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class AppUser : IdentityUser
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IdNum", TypeName ="int")]
        public int IdNum { get; set; }
        [Required]
        [Column("First Name", TypeName ="varchar(50)")]
        public string FirstName { get; set; }

        [Required]
        [Column("Last Name", TypeName = "varchar(50)")]
        public string LastName { get; set; }

        
        [Column("User Image", TypeName = "nvarchar(MAX)")]
        public string UserImage { get; set; }

        [Required]
        [Column("Date of birth", TypeName = "Date")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [Column("User Role", TypeName = "varchar(50)")]
        public string RoleOfUser { get; set; }

        [ForeignKey("TeamId")]
        public int? UserTeamId { get; set; }

        [Column("User Team")]
        public virtual Team UserTeam { get; set; }

        [Required]
        [Column("User Address")]
        public string Address { get; set; }
        [JsonIgnore]
        public ICollection<Call> Calls { get; set; }

        [Required]
        public bool AccountAllowed { get; set; }

        public virtual ICollection<WorkRequest> UserWorkRequests { get; set; }

        public AppUser()
        {
            UserWorkRequests = new HashSet<WorkRequest>();
        }
    }
}
