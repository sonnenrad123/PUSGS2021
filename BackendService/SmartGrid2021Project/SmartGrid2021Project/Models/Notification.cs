using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class Notification
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; }
        public string Desc { get; set; }
        public DateTime Date { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; } //#969696 unread #F0F0F0 read
        //public string UserEmail { get; set; }
        public string Wr {get;set;}
        public string Sp { get; set; }
        public string Sd { get; set; }
        public string Inc { get; set; }

    }
}