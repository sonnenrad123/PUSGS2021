using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    [Table("WorkRequests")]

    public class WorkRequest
    {
        [Required]
        [Column("ID")]
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WR_id { get; set; }

        [Required]
        [Column("CreatedBy", TypeName = "varchar(60)")]
        public string CreatedBy { get; set; }

        [Required]
        [Column("Company", TypeName = "varchar(60)")]
        public string Company { get; set; }

        [Required]
        [Column("Purpose", TypeName = "nvarchar(MAX)")]
        public string Purpose { get; set; }

        [Column("Details", TypeName = "nvarchar(MAX)")]
        public string Details { get; set; }

        [Column("Notes", TypeName = "nvarchar(MAX)")]
        public string Notes { get; set; }

        [Column("Address", TypeName = "nvarchar(MAX)")]
        public string Street { get; set; }
        
        [ForeignKey("Id")]
        [Column("IncidentId")]
        public int? IncidentId { get; set; }

        [Column("Incident")]
        public virtual Incident Incident { get; set; }

        [Required]
        [Column("StartDate", TypeName = "Date")]
        public DateTime StartDateTime { get; set; }

        [Required]
        [Column("CreatedOnDate", TypeName = "Date")]
        public DateTime DateTimeCreated { get; set; }

        [Required]
        [Column("EndDate", TypeName = "Date")]
        public DateTime EndDateTime { get; set; }

        [Column("IsEmergencyWork", TypeName = "Bit")]
        public bool EmergencyWork { get; set; }

        [Required]
        [Column("PhoneNo", TypeName = "Int")]
        public int PhoneNo { get; set; }

        [Required]
        [Column("TypeOfDocument", TypeName = "Int")]
        public IncidentType TypeOfDocument { get; set; }

        [Required]
        [Column("DocumentStatus", TypeName = "int")]
        public WrDocumentStatus StatusOfDocument { get; set; }

        [ForeignKey("AppUserId")]
        public int? AppUserId { get; set; }

        [Column("AppUser")]
        public virtual AppUser AppUser { get; set; }

        public virtual ICollection<Device> Equipment { get; set; }
        public virtual ICollection<Attachment> Attachments { get; set; }
        public virtual ICollection<WRStateChange> StateChangesHistory { get; set; }

        public WorkRequest()
        {
            Equipment = new HashSet<Device>();
            Attachments = new HashSet<Attachment>();
            StateChangesHistory = new HashSet<WRStateChange>();
        }

        
    }
}
