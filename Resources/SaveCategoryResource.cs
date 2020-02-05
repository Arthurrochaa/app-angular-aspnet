using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Resources
{
    public class SaveCategoryResource
    {
        [Required]
        public string Name { get; set; }
    }
}
