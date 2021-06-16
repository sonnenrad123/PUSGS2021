using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Controllers
{
    public class WorkRequestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
