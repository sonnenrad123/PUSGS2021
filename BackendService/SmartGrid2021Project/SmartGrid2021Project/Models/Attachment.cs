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
        public int Id { get; set; }

        [Required]
        [Column("DataSrc", TypeName ="nvarchar(MAX)")]
        public string Name { get; set; }

        [Required]
        [Column("Type", TypeName = "nvarchar(MAX)")]
        public string type { get; set; }

        [Required]
        [Column("Size", TypeName = "int")]
        public int Size { get; set; }

        [Required]
        [Column("Progress", TypeName = "int")]
        public int Progress { get; set; }

        [Required]
        [Column("Base64Representation", TypeName ="nvarchar(MAX)")]
        public string ToBase64 { get; set; }


        public virtual ICollection<WorkRequest> WorkRequests { get; set; }
        public virtual ICollection<SafetyDocument> SafetyDocuments { get; set; }

        public Attachment()
        {
            WorkRequests = new HashSet<WorkRequest>();
            SafetyDocuments = new HashSet<SafetyDocument>();
        }

    }
}
