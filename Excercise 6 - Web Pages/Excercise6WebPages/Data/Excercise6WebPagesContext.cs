using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Excercise6WebPages.Models;

namespace Excercise6WebPages.Data
{
    public class Excercise6WebPagesContext : DbContext
    {
        public Excercise6WebPagesContext (DbContextOptions<Excercise6WebPagesContext> options)
            : base(options)
        {
        }

        public DbSet<Excercise6WebPages.Models.Movie> Movie { get; set; }
    }
}
