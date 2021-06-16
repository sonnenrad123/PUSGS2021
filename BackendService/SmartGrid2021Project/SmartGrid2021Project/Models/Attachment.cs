using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    [Table("Attachments")]
    public class Attachment
    {
        [Required]
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID", TypeName ="int")]
        public int Att_Id { get; set; }

        [Required]
        [Column("DataSrc", TypeName ="nvarchar(MAX)")]
        public string Source { get; set; }

        [Required]
        [Column("Base64Representation", TypeName ="nvarchar(MAX)")]
        public string Base64 { get; set; }


        [ForeignKey("WorkReqId")]
        public int? WorkRequestId { get; set; }

        [Column("WorkRequest")]
        public virtual WorkRequest WorkRequest { get; set; }
    }
}
