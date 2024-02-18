using Application.Interfaces;
using Application.Modules.Farms.Queries.BrowseFarms;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Farms.Queries;

internal sealed class BrowseFarmsHandler : IRequestHandler<BrowseFarmsQuery, List<FarmsDto>>
{
    private readonly MyFarmDbContext _dbContext;
    private readonly IUserAccessor _userAccessor;

    public BrowseFarmsHandler(MyFarmDbContext dbContext, IUserAccessor userAccessor)
    {
        _dbContext = dbContext;
        _userAccessor = userAccessor;
    }

    public async Task<List<FarmsDto>> Handle(BrowseFarmsQuery request, CancellationToken cancellationToken)
    {
        var farms = await _dbContext.Farms
            .Where(f=>f.UserId == _userAccessor.GetUserIdAsGuid())
            .Select(f => new FarmsDto()
            {
                Id = f.Id,
                Address = f.Address,
                Name = f.Name
            }).ToListAsync(cancellationToken);

        return farms;
    }
}