using Application.Farms.Queries.BrowseFarms;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Farms.Queries;

public class BrowseFarmsHandler : IRequestHandler<BrowseFarmsQuery, BrowseFarmsResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public BrowseFarmsHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<BrowseFarmsResponse> Handle(BrowseFarmsQuery request, CancellationToken cancellationToken)
    {
        var farms = await _dbContext.Farms
            .Select(f => new BrowseFarmsResponse.Farms()
            {
                Id = f.Id,
                Address = f.Address
            }).ToListAsync(cancellationToken);

        return new BrowseFarmsResponse(farms);
    }
}