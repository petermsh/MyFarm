using Application.Farms.Queries.GetFarm;
using Domain.Repositories;
using Infrastructure.Farms.Queries;
using Infrastructure.Farms.Repository;
using Infrastructure.Middleware;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddSingleton<ExceptionMiddleware>();
        services.AddHttpContextAccessor();
        
        
        services.AddPostgres(configuration);
        
        services.AddEndpointsApiExplorer();
        services.AddSwagger();
        
        services.AddScoped<IFarmRepository, FarmRepository>();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetFarmHandler).Assembly));
        
        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseSwagger();
        app.UseSwaggerUI();
        
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        
        return app;
    }
}