using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class Incident
    {
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string IncidentType { get; set; }
        public int Priority { get; set; }
        public bool Confirmed { get; set; }
        public string Status { get; set; }
        public string IncidentDesc { get; set; }
        public DateTime ETA { get; set; }
        public DateTime ETR { get; set; }
        public DateTime ATA { get; set; }
        public int AffectedCustomers { get; set; }
        public DateTime OutageTime { get; set; }
        public int Calls { get; set; }
        public double Voltage { get; set; }
        public DateTime ScheduledTime { get; set; }
        public bool DodeliSebi { get; set; }
        public string Cause { get; set; }
        public string Subcause { get; set; }
        public string ConstructionType { get; set; }
        public string Material { get; set; }
        public string phoneNo { get; set; }
        [JsonIgnore]
        public AppUser User { get; set; }
        [JsonIgnore]
        public ICollection<Device> Devices { get; set; }
        [JsonIgnore]
        public Team IncidentCrew { get; set; }
        [NotMapped]
        public string CustomId
        {
            get { return string.Concat("INC", Id); }
        }
        [NotMapped]
        public string DeviceIds { get; set; }
        [NotMapped]
        public string CreatorEmail { get; set; }
        [NotMapped]
        public int CrewId { get; set; }

        public virtual ICollection<WorkRequest> WorkRequests { get; set; }

        public Incident()
        {
            WorkRequests = new HashSet<WorkRequest>();
        }
    }
}
