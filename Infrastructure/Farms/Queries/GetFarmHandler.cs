using Application.Farms.Exceptions;
using Application.Farms.Queries.GetFarm;
using Domain.Repositories;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Farms.Queries;

public class GetFarmHandler : IRequestHandler<GetFarmQuery, GetFarmResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public GetFarmHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetFarmResponse> Handle(GetFarmQuery request, CancellationToken cancellationToken)
    {
        var farm = await _dbContext.Farms
            .AsNoTracking()
            .Where(f => f.Id == request.Id)
            .Select(f => new GetFarmResponse
            {
                Id = f.Id,
                Address = f.Address,
                CreatedAt = f.CreatedAt
            }).SingleOrDefaultAsync(cancellationToken);

        if(farm is null)
            throw new FarmNotFoundException(request.Id);
        
        return farm;
    }
}