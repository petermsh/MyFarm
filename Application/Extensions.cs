using Application.Farms.Commands.CreateFarm;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class Extensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // var applicationAssembly = typeof(ICommandHandler<,>).Assembly;

        // services.Scan(s => s.FromAssemblies(applicationAssembly)
        //     .AddClasses(x => x.AssignableTo(typeof(ICommandHandler<,>)))
        //     .AsImplementedInterfaces()
        //     .WithScopedLifetime());
        //
        // services.Scan(s => s.FromAssemblies(applicationAssembly)
        //     .AddClasses(x => x.AssignableTo(typeof(ICommandHandler<>)))
        //     .AsImplementedInterfaces()
        //     .WithScopedLifetime());
        
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateFarmHandler).Assembly));

        return services;
    }
}