using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class StateChangesSP{
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string State{ get; set; }
        public DateTime Date { get; set; }
        public string Autor { get; set; }
        [JsonIgnore]
        public AppUser User { get; set; }

        public StateChangesSP() { }
    }

    public class AttachmentSP
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public AttachmentSP() { }
    }

    public class WorkInstructionSP
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Desc { get; set; }
        public string Device { get; set; }
        public string Executed { get; set; }
        //public string Color { get; set; }

        public WorkInstructionSP() { }
    }

    public class SwitchingPlan
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string TypeOfDocument { get; set; }
        public string WarrantForWork { get; set; }
        public string Status { get; set; }
        public string Incident { get; set; }
        public string Street { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string Team { get; set; }
        public string CreatedBy { get; set; }
        public string Purpose { get; set; }
        public string Notes { get; set; }
        public string Company { get; set; }
        public string PhoneNo { get; set; }
        public DateTime DateTimeCreated { get; set; }
        [JsonIgnore]
        public AppUser User { get; set; }
        [JsonIgnore]
        public ICollection<Device> Equipment { get; set; }
        [JsonIgnore]
        public ICollection<StateChangesSP> StateChanges { get; set; }
        [JsonIgnore]
        public ICollection<AttachmentSP> Attachments { get; set; }
        [JsonIgnore]
        public ICollection<WorkInstructionSP> WorkInstructions { get; set; }

        [NotMapped]
        public string CustomId
        {
            get { return string.Concat("SP", Id); }
        }

        [NotMapped]
        public string DeviceIds { get; set; }
        [NotMapped]
        public string WorkInstrutcionsString { get; set; }
        [NotMapped]
        public string StateChangesString { get; set; }
        [NotMapped]
        public string AttachmentsString { get; set; }
        [NotMapped]
        public string CreatorEmail { get; set; }

        public SwitchingPlan() { }
        
    }
}