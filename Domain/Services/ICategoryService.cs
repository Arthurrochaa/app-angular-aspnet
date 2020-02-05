using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task<CategoryResponse> SaveCategoryAsync(Category category);
        Task<CategoryResponse> GetCategoryByIdAsync(long id);
        Task<CategoryResponse> UpdateCategoryAsync(long id, Category category);
        Task<CategoryResponse> RemoveCategoryAsync(long id);
    }
}
