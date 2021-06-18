using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class SafetyDocument
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; }
        public string PhoneNo { get; set; }
        //dodaj polje za cuvanje switching plan-a
        public string SafetyDocType { get; set; }
        public string Status { get; set; }
        public string DateTimeCreated { get; set; }
        [JsonIgnore]
        public AppUser Creator { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }
        [JsonIgnore]
        public ICollection<Device> Devices { get; set; }
        public bool WorkCompleted { get; set; }
        public bool TagsRemoved { get; set; }
        public bool GroundingRemoved { get; set; }
        public bool ReadyForService { get; set; }
        [NotMapped]
        public int switchingPlanId { get; set; }
        [NotMapped]
        public string CreatorEmail { get; set; }
        [NotMapped]
        public string DeviceIds { get; set; }

    }
}
