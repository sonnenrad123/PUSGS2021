using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartGrid2021Project.Models
{
    public class WREquipment
    {
        public List<Device> Equipment { get; set; }

        public WREquipment()
        {
            this.Equipment = new List<Device>();
        }
    }
}
