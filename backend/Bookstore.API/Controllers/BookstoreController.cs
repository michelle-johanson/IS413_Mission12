using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Bookstore.API.Data;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private readonly BookstoreDbContext _context;

        public BookstoreController(BookstoreDbContext context) => _context = context;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize, int pageNumber, string? sortOrder = "asc", [FromQuery] List<string>? categories = null)
        {
            var query = _context.Books.AsQueryable();

            query = sortOrder == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            if (categories != null && categories.Any())
            {
                query = query.Where(c => c.Category != null && categories.Contains(c.Category));
            }

            var filteredTotal = query.Count();

            var books = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalBooks = filteredTotal
            });
        }

        [HttpGet("GetCategories")]
        public IActionResult GetCategories ()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
    }
}