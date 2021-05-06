using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class AppUser : IdentityUser
    {
        [Column(TypeName ="varchar(50)")]
        [Required]
        public string FirstName { get; set; }
        
        [Column(TypeName = "varchar(50)")]
        [Required]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(50)")]
        [Required]
        public string UserImage { get; set; }

        [Column(TypeName = "Date")]
        [Required]
        public DateTime DateOfBirth { get; set; }

        [Column(TypeName = "varchar(50)")]
        [Required]
        public string RoleOfUser { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserTeam { get; set; }

        [Column(TypeName = "varchar(90)")]
        public string Address { get; set; }
    }
}
