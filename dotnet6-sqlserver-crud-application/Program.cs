using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Helpers;
using System;

using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// add services to DI container
var services = builder.Services;
var env = builder.Environment;

services.AddDbContext<DataContext>();
services.AddCors();
services.AddControllers().AddJsonOptions(x =>
{
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

    // ignore omitted parameters on models to enable optional params (e.g. User update)
    x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// configure DI for application services
services.AddScoped<IUserService, UserService>();

// Add named CORS policy
services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// configure HTTP request pipeline
app.UseCors("AllowAll");
app.UseMiddleware<ErrorHandlerMiddleware>();
app.MapControllers();
app.Run("http://localhost:9080");
