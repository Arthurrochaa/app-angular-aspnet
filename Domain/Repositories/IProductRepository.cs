using app_angular_aspnet.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task SaveProductAsync(Product product);

        Task<Product> GetProductbyIdAsync(long id);

        Task UpdateProductAsync(Product product);

        Task RemoveProductAsync(Product product);
    }
}
