using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class GeneralDBContext: IdentityDbContext<AppUser>
    {
        public GeneralDBContext(DbContextOptions options):base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Call> Calls { get; set; }
        
        public DbSet<WorkRequest> WorkRequests { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<WRStateChange> WRStateChange { get; set; }
        public DbSet<SafetyDocument> SafetyDocuments { get; set; }
        public DbSet<StreetPriority> StreetPriorities { get; set; }
        public DbSet<StateChangesSP> StateChangesSPs { get; set; }
        //public DbSet<AttachmentSP> AttachmentSPs { get; set; }
        public DbSet<WorkInstructionSP> WorkInstructionSPs { get; set; }
        public DbSet<SwitchingPlan> SwitchingPlans { get; set; }
        public DbSet<Notification> Notifications { get; set; }
    }  
}
