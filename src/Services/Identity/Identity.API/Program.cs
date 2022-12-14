using APICommonLibrary;
using Identity.API.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings"], builder =>
    {
        //builder.EnableRetryOnFailure(1, TimeSpan.FromSeconds(3), null);
    });
});
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Configuration["EnsureOverwrite"] == "True")
{
    app.Services.EnsureOverwrite<DataContext>();
}
else if (app.Configuration["EnsureCreated"] == "True")
{
    app.Services.EnsureCreated<DataContext>();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
