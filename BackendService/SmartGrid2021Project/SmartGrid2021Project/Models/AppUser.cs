﻿using Microsoft.AspNetCore.Identity;
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
        
        [Required]
        [Column("First Name", TypeName ="varchar(50)")]
        public string FirstName { get; set; }

        [Required]
        [Column("Last Name", TypeName = "varchar(50)")]
        public string LastName { get; set; }

        
        [Column("User Image", TypeName = "varchar(50)")]
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
        [Column("User Address", TypeName = "varchar(90)")]
        public string Address { get; set; }
    }
}
