using System.Configuration;
using System.Text;
using jwt_tooken_authentication.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


var Configutation = builder.Configuration;
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<WebsiteService>();
builder.Services.AddHostedService<MonitoringService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<EmailNotificationService>();
builder.Services.AddDbContext<ApplicationDbContext>(options => { options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 2))); });
builder.Services.AddAuthentication(options => { options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Configutation["Jwt:Issuer"], // Correct key for issuer validation
            ValidAudience = Configutation["Jwt:Audience"], // Correct key for audience validation
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configutation["Jwt:Key"]))
        };
        options.MapInboundClaims = false;
    });

var app = builder.Build();
app.UseCors("AllowAll");
// Configure the HTTP request pipeline.

app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();


//using System.Configuration;
//using System.Text;
//using jwt_tooken_authentication.Services;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;

//var builder = WebApplication.CreateBuilder(args);


//var Configutation = builder.Configuration;
//// Add services to the container.

//builder.Services.AddControllers();
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<WebsiteService>();
//builder.Services.AddHostedService<MonitoringService>();
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyHeader()
//              .AllowAnyMethod();
//    });
//});

//builder.Services.AddSingleton<EmailNotificationService>();
//builder.Services.AddDbContext<ApplicationDbContext>(options => { options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 2))); });
//builder.Services.AddAuthentication(options => { options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; })
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
//        {
//            ValidateIssuer = false,
//            ValidateAudience = false,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = Configutation["Jwt:Issuer"], // Correct key for issuer validation
//            ValidAudience = Configutation["Jwt:Audience"], // Correct key for audience validation
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configutation["Jwt:Key"]))
//        };
//    });

//var app = builder.Build();
//app.UseCors("AllowAll");
//// Configure the HTTP request pipeline.
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.Run();
