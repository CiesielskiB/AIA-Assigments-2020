using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Excercise6WebPages.Data;
using Excercise6WebPages.Models;

namespace Excercise6WebPages.Pages.Movies
{
    public class DetailsModel : PageModel
    {
        private readonly Excercise6WebPages.Data.Excercise6WebPagesContext _context;

        public DetailsModel(Excercise6WebPages.Data.Excercise6WebPagesContext context)
        {
            _context = context;
        }

        public Movie Movie { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Movie = await _context.Movie.FirstOrDefaultAsync(m => m.ID == id);

            if (Movie == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
