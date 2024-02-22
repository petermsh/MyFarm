using Application.Modules.Plants.Exceptions;
using Application.Modules.Plants.Queries.GetPlant;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Plants.Queries;

internal sealed class GetPlantHandler : IRequestHandler<GetPlantQuery, GetPlantResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public GetPlantHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetPlantResponse> Handle(GetPlantQuery request, CancellationToken cancellationToken)
    {
        var plant = await _dbContext.Plants
            .AsNoTracking()
            .Where(p => p.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);
        
        if (plant is null)
            throw new PlantNotFoundException(request.Id);

        return plant.AsResponse();
    }
}