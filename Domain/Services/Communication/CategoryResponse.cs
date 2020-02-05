using app_angular_aspnet.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace app_angular_aspnet.Domain.Services.Communication
{
    public class CategoryResponse : BaseResponse
    {
        public Category Category { get; protected set; }

        public CategoryResponse(bool success, string message, Category category) : base(success, message)
        {
            this.Category = category;
        }

        public CategoryResponse(Category category) : this(true, string.Empty, category) { }

        public CategoryResponse(string message) : this(false, message, null) { }
    }
}
