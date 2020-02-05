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
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _appDbContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(long id)
        {
            return await _appDbContext.Categories.FindAsync(id);
        }

        public async Task RemoveCategoryAsync(Category category)
        {
            _appDbContext.Remove(category);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task SaveCategoryAsync(Category category)
        {
            await _appDbContext.Categories.AddAsync(category);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _appDbContext.Update(category);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
