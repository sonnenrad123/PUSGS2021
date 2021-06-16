using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class WRStateChange
    {
        [Required]
        [Column("ID", TypeName ="int")]
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WRSC_Id { get; set; }

        [ForeignKey("ModifiedByUserId")]
        public int? ModifiedByUserId { get; set; }

        [Column("ModifiedByUser")]        
        public virtual AppUser ChangedByUser { get; set; }

        [Required]
        [Column("DateModified", TypeName ="Date")]
        public DateTime ChangedOn { get; set; }

        [Required]
        [Column("CurrentStatus", TypeName ="int")]
        public WrDocumentStatus WRCurrentState { get; set; }


        [ForeignKey("WorkReqId")]
        public int? WorkRequestId { get; set; }

        [Column("WorkRequest")]
        public virtual WorkRequest WorkRequest { get; set; }
    }
}
