using Application.Farms.Queries.BrowseFarms;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Farms.Queries;

public class BrowseFarmsHandler : IRequestHandler<BrowseFarmsQuery, List<FarmsDto>>
{
    private readonly MyFarmDbContext _dbContext;

    public BrowseFarmsHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<FarmsDto>> Handle(BrowseFarmsQuery request, CancellationToken cancellationToken)
    {
        var farms = await _dbContext.Farms
            .Select(f => new FarmsDto()
            {
                Id = f.Id,
                Address = f.Address,
                Name = f.Name
            }).ToListAsync(cancellationToken);

        return farms;
    }
}