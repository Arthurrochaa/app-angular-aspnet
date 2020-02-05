using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Models
{
    public class Category
    {
        public long CategoryID { get; set; }
        public string Name { get; set; }
        public virtual IList<Product> Products { get; set; } = new List<Product>();
    }
}
