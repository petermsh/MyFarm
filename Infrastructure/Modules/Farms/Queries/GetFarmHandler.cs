using Application.Interfaces;
using Application.Modules.Farms.Exceptions;
using Application.Modules.Farms.Queries.GetFarm;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Farms.Queries;

internal sealed class GetFarmHandler : IRequestHandler<GetFarmQuery, GetFarmResponse>
{
    private readonly MyFarmDbContext _dbContext;
    private readonly IUserAccessor _userAccessor;

    public GetFarmHandler(MyFarmDbContext dbContext, IUserAccessor userAccessor)
    {
        _dbContext = dbContext;
        _userAccessor = userAccessor;
    }

    public async Task<GetFarmResponse> Handle(GetFarmQuery request, CancellationToken cancellationToken)
    {
        var farm = await _dbContext.Farms
            .AsNoTracking()
            .Where(f => f.Id == request.Id)
            .Where(f=>f.UserId == _userAccessor.GetUserIdAsGuid())
            .Include(f=>f.Seasons)
            .Select(f => new GetFarmResponse
            {
                Id = f.Id,
                Address = f.Address,
                Name = f.Name,
                CreatedAt = f.CreatedAt
            }).SingleOrDefaultAsync(cancellationToken);

        if(farm is null)
            throw new FarmNotFoundException(request.Id);
        
        return farm;
    }
}