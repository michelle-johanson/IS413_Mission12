using Microsoft.EntityFrameworkCore;
using Bookstore.API.Data;

var builder = WebApplication.CreateBuilder(args);

// --- 1. THE INGREDIENTS (Services) ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookstoreDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

// Define the CORS policy HERE (before builder.Build)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

// --- 2. THE RECIPE (Middleware Pipeline) ---

// Move Swagger outside the 'if' for now so you can test it on Azure!
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// ACTIVATE the CORS policy (Must be before MapControllers)
app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();