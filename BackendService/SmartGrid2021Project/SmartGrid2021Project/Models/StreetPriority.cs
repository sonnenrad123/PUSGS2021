using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class StreetPriority
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Address { get; set; }
        public int Priority { get; set; }
    }
}
