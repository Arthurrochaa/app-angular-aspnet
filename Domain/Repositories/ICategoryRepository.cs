using app_angular_aspnet.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task SaveCategoryAsync(Category category);
        Task<Category> GetCategoryByIdAsync(long id);
        Task UpdateCategoryAsync(Category category);
        Task RemoveCategoryAsync(Category category);

    }
}
