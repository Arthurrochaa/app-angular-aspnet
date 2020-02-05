using app_angular_aspnet.Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Persistence.Contexts
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public DbInitializer(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public void Initialize()
        {
            if (_context.Database.EnsureCreated())
            {
                var appUser = new ApplicationUser()
                {
                    UserName = "admin_apiangular",
                    Email = "admin-apiangular@teste.com",
                    EmailConfirmed = true
                };
                _userManager.CreateAsync(appUser, "adminApiAngular@123").Wait();
            };
        }
    }
}
