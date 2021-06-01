﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class Incident
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public IncidentType IncidentType { get; set; }
        public int Priority { get; set; }
        public bool Confirmed { get; set; } = false;
        public IncidentStatus Status { get; set; }
        public string IncidentDesc { get; set; }
        public DateTime ETA { get; set; }
        public DateTime ETR { get; set; }
        public DateTime ATA { get; set; }
        public int AffectedCustomers { get; set; }
        public DateTime OutageTime { get; set; } = DateTime.Now;
        public int Calls { get; set; }
        public double Voltage { get; set; }
        public DateTime ScheduledTime { get; set; }
        public bool DodeliSebi { get; set; }
        public string IdToShow
        {
            get { return string.Concat("INC", Id); }
            set { IdToShow = string.Concat("INC", Id); }
        }

    }
}