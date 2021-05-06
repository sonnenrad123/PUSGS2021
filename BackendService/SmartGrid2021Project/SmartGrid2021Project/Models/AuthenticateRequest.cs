using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class AuthenticateRequest
    {
        public string authToken { get; set; }

        public string IdToken { get; set; }
    }
}
