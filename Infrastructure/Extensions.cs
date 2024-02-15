using System.Reflection;
using Domain.Repositories;
using Infrastructure.InfraExtensions;
using Infrastructure.Middleware;
using Infrastructure.Modules.Farms.Repository;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class Extensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddSingleton<ExceptionMiddleware>();
        services.AddHttpContextAccessor();

        services.AddIdentity(configuration);
        services.AddPostgres(configuration);
        
        services.AddEndpointsApiExplorer();
        services.AddSwagger();
        
        services.AddScoped<IFarmRepository, FarmRepository>();
        
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        
        services.AddCors(o =>
        {
            o.AddPolicy("CorsPolicy", policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000")
                    .SetIsOriginAllowed((host) => true);;
            });
        });
        
        return services;
    }

    public static WebApplication UseInfrastructure(this WebApplication app)
    {
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseCors("CorsPolicy");
        
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        
        return app;
    }
}