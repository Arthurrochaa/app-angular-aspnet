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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _categoryRepository.GetCategoriesAsync();
        }

        public async Task<CategoryResponse> GetCategoryByIdAsync(long id)
        {
            try
            {
                var category = await _categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    return new CategoryResponse("Product not found.");
                }

                return new CategoryResponse(category);
            }
            catch (Exception ex)
            {
                return new CategoryResponse(ex.Message);
            }
        }

        public async Task<CategoryResponse> RemoveCategoryAsync(long id)
        {
            try
            {
                var category = await _categoryRepository.GetCategoryByIdAsync(id);

                if (category == null)
                {
                    return new CategoryResponse("Category not found.");
                }

                await _categoryRepository.RemoveCategoryAsync(category);

                return new CategoryResponse(category);
            }
            catch (Exception ex)
            {
                return new CategoryResponse(ex.Message);
            }
        }

        public async Task<CategoryResponse> SaveCategoryAsync(Category category)
        {
            try
            {
                await _categoryRepository.SaveCategoryAsync(category);
                return new CategoryResponse(category);
            }
            catch (Exception ex)
            {
                return new CategoryResponse(ex.Message);
            }
        }

        public async Task<CategoryResponse> UpdateCategoryAsync(long id, Category category)
        {
            try
            {
                var existingCategory = await _categoryRepository.GetCategoryByIdAsync(id);
                if (existingCategory == null)
                {
                    return new CategoryResponse("Category not found.");
                }

                existingCategory.Name = category.Name;

                await _categoryRepository.UpdateCategoryAsync(existingCategory);
                return new CategoryResponse(existingCategory);
            }
            catch (Exception ex)
            {
                return new CategoryResponse(ex.Message);
            }
        }
    }
}
