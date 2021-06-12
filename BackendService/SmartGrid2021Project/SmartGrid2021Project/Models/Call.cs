using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class Call
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CallId { get; set; }

        public string Reason { get; set; }
        public string Comment { get; set; }
        public string Hazard { get; set; }
        public AppUser Caller { get; set; }
        [NotMapped]
        public int CallerUsername { get; set; }
    }
}
