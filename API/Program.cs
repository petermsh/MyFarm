using Application;
using Domain;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddDomain()
    .AddApplication()
    .AddInfrastructure(builder.Configuration);


var app = builder.Build();

app.UseInfrastructure();

app.Run();