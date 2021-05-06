using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class AuthenticationContext : IdentityDbContext<AppUser>
    {
        public AuthenticationContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<AppUser> AppUsers { get; set; }
    }
}
