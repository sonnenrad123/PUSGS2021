using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class Device
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Coordinates { get; set; } //kasnije ce u daljim migracijama vrv biti menjano
        [JsonIgnore]
        public ICollection<Incident> Incidents { get; set; }
        [NotMapped]
        public string CustomId
        {
            get { return string.Concat("DEV", Id); }
        }

        public virtual ICollection<WorkRequest> WorkRequests { get; set; }
        public virtual ICollection<SafetyDocument> SafetyDocuments { get; set; }
        public virtual ICollection<SwitchingPlan> SwitchingPlans { get; set; }
        

        public Device()
        {
            WorkRequests = new HashSet<WorkRequest>();
            SwitchingPlans = new List<SwitchingPlan>();
        }

    }
}
