using Microsoft.EntityFrameworkCore;
using MoviesTutorial.Models;

namespace MoviesTutorial.Data
{
	public class MoviesTutorialContext : DbContext
	{
		public MoviesTutorialContext(DbContextOptions<MoviesTutorialContext> options)
			: base(options)
		{
		}

		public DbSet<Movie> Movie { get; set; }
	}
}