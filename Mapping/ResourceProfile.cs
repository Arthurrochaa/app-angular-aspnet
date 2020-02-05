using app_angular_aspnet.Domain.Models;
using app_angular_aspnet.Resources;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Mapping
{
    public class ResourceProfile : Profile
    {
        public ResourceProfile()
        {
            CreateMap<Category, CategoryResource>();
            CreateMap<Product, ProductResource>();
            CreateMap<SaveProductResource, Product>();
            CreateMap<SaveCategoryResource, Category>();
        }
    }
}
