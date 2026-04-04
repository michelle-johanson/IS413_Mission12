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
        public IActionResult GetBooks(int pageSize, int pageNumber, string? sortOrder = "asc")
        {
            var query = _context.Books.AsQueryable();

            query = sortOrder == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            var books = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                books,
                totalBooks = _context.Books.Count()
            });
        }

        [HttpGet("SpecialBooks")]
        public IEnumerable<Book> GetSpecialBooks()
        {
            var something = _context.Books
                .Where(b => b.Price > 20)
                .ToList();
            return something;
        }
    }
}