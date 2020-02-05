using app_angular_aspnet.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Services.Communication
{
    public class ProductResponse : BaseResponse
    {
        public Product Product { get; private set; }

        public ProductResponse(bool success, string message, Product product) : base(success, message)
        {
            this.Product = product;
        }

        public ProductResponse(Product product) : this(true, string.Empty, product) { }

        public ProductResponse(string message) : this(false, message, null) { }
    }
}
