using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class UserLoginCredentials
    {
        [Required]
        [EmailAddress]
        public string UserEmail { get; set; }

        [Required]
        public string Password { get; set; }

       
    }
}
