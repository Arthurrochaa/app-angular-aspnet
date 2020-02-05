using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Domain.Repositories;
using app_angular_aspnet.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Persistence.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Product> GetProductbyIdAsync(long id)
        {
            var product = await _appDbContext.Products.SingleOrDefaultAsync(p => p.ProductID == id);
            _appDbContext.Entry(product).Reference(p => p.Category).Load();
            return product;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _appDbContext.Products.Include(p => p.Category).ToListAsync();
        }

        public async Task RemoveProductAsync(Product product)
        {
            _appDbContext.Products.Remove(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task SaveProductAsync(Product product)
        {
            await _appDbContext.Products.AddAsync(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _appDbContext.Products.Update(product);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
