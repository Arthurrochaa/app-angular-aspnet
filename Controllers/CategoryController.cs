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
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _mapper = mapper;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesAsync()
        {
            var categories = await _categoryService.GetCategoriesAsync();
            var resources = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryResource>>(categories);
            return Ok(resources);
        }

        [HttpPost]
        public async Task<IActionResult> SaveCategoryAsync([FromBody] SaveCategoryResource categoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = _mapper.Map<SaveCategoryResource, Category>(categoryResource);
            var result = await _categoryService.SaveCategoryAsync(category);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Category, CategoryResource>(result.Category);
            return Ok(resource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoryAsync(long id, [FromBody] SaveCategoryResource categoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var category = _mapper.Map<SaveCategoryResource, Category>(categoryResource);
            var result = await _categoryService.UpdateCategoryAsync(id, category);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Category, CategoryResource>(result.Category);

            return Ok(resource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCategoryAsync(long id)
        {
            var result = await _categoryService.RemoveCategoryAsync(id);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Category, CategoryResource>(result.Category);
            return Ok(resource);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryByIdAsync(long id)
        {
            var result = await _categoryService.GetCategoryByIdAsync(id);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var resource = _mapper.Map<Category, CategoryResource>(result.Category);
            return Ok(resource);
        }
    }
}