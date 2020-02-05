using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Domain.Repositories;
using app_angular_aspnet.Domain.Services;
using app_angular_aspnet.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductResponse> GetProductByIdAsync(long id)
        {
            try
            {
                var existingProduct = await _productRepository.GetProductbyIdAsync(id);
                if (existingProduct == null)
                {
                    return new ProductResponse("Product not found.");
                }

                return new ProductResponse(existingProduct);
            }
            catch (Exception ex)
            {
                return new ProductResponse(ex.Message);
            }
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productRepository.GetProductsAsync();
        }

        public async Task<ProductResponse> RemoveProductAsync(long id)
        {
            try
            {
                var existingProduct = await _productRepository.GetProductbyIdAsync(id);
                if (existingProduct == null)
                {
                    return new ProductResponse("Product not found.");
                }

                await _productRepository.RemoveProductAsync(existingProduct);
                return new ProductResponse(existingProduct);
            }
            catch (Exception ex)
            {
                return new ProductResponse(ex.Message);
            }
        }

        public async Task<ProductResponse> SaveProductAsync(Product product)
        {
            try
            {
                await _productRepository.SaveProductAsync(product);
                return new ProductResponse(product);
            }
            catch (Exception ex)
            {
                return new ProductResponse(ex.Message);
            }
        }

        public async Task<ProductResponse> UpdateProductAsync(long id, Product product)
        {
            try
            {
                var existingProduct = await _productRepository.GetProductbyIdAsync(id);

                if (existingProduct == null)
                {
                    return new ProductResponse("Product not found.");
                }

                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;
                existingProduct.CategoryID = product.CategoryID;

                await _productRepository.UpdateProductAsync(existingProduct);
                return new ProductResponse(existingProduct);
            }
            catch (Exception ex)
            {
                return new ProductResponse(ex.Message);
            }
        }
    }
}
