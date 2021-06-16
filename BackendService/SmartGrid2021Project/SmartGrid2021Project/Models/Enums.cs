using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
   public enum UserRole
    {
        Worker, Dispatcher, TeamMember, Admin, User
    }

    public enum IncidentType
    {
        [Display(Name ="Planned Work")]
        Planned,
        [Display(Name = "Unplanned Work")]
        Unplanned
    }

    public enum TypeOfDocument
    {
        [Display(Name = "Planned Work")]
        Planned_work,
        [Display(Name = "Unplanned Work")]
        Unplanned_work
    }

    public enum IncidentStatus
    {
        Dispatched,Draft,Submited
    }

    public enum WrDocumentStatus
    {
        Draft, Canceled, Denied, Approved
    }

}
