using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Domain.Services;
using app_angular_aspnet.Resources;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace app_angular_aspnet.Controllers
{
    
    [ApiController]
    [Authorize("Bearer")]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _productService.GetProductsAsync();
            var resources = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return Ok(resources);
        }

        [HttpPost]
        public async Task<IActionResult> SaveProductAsync([FromBody] SaveProductResource productResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Model invalid.");
            }

            var product = _mapper.Map<SaveProductResource, Product>(productResource);

            var result = await _productService.SaveProductAsync(product);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Product, ProductResource>(result.Product);

            return Ok(resource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductAsync(long id, [FromBody] SaveProductResource productResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var product = _mapper.Map<SaveProductResource, Product>(productResource);

            var result = await _productService.UpdateProductAsync(id, product);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Product, ProductResource>(result.Product);

            return Ok(resource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveProductAsync(long id)
        {
            var result = await _productService.RemoveProductAsync(id);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Product, ProductResource>(result.Product);

            return Ok(resource);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync(long id)
        {
            var result = await _productService.GetProductByIdAsync(id);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Product, ProductResource>(result.Product);

            return Ok(resource);
        }
    }
}