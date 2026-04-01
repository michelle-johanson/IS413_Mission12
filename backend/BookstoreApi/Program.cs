using BookstoreApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5123").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();
app.UseHttpsRedirection();

app.MapGet("/api/books", async (BookstoreContext db,
    int pageNum = 1,
    int pageSize = 5,
    string sortOrder = "asc",
    string? category = null) =>
{
    var filtered = string.IsNullOrEmpty(category)
        ? db.Books
        : db.Books.Where(b => b.Category == category);

    var query = sortOrder == "desc"
        ? filtered.OrderByDescending(b => b.Title)
        : filtered.OrderBy(b => b.Title);

    var totalCount = await filtered.CountAsync();

    var books = await query
        .Skip((pageNum - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return Results.Ok(new { books, totalCount });
});

app.MapGet("/api/categories", async (BookstoreContext db) =>
{
    var categories = await db.Books
        .Select(b => b.Category)
        .Distinct()
        .OrderBy(c => c)
        .ToListAsync();

    return Results.Ok(categories);
});

app.Run();
