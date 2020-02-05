using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<ProductResponse> SaveProductAsync(Product product);

        Task<ProductResponse> UpdateProductAsync(long id, Product product);

        Task<ProductResponse> RemoveProductAsync(long id);

        Task<ProductResponse> GetProductByIdAsync(long id);
    }
}
