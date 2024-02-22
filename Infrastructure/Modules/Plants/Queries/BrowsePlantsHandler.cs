using Application.Interfaces;
using Application.Modules.Plants.Queries.BrowsePlants;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Plants.Queries;

internal sealed class BrowsePlantsHandler : IRequestHandler<BrowsePlantsQuery, List<PlantDto>>
{
    private readonly MyFarmDbContext _dbContext;
    private readonly IUserAccessor _userAccessor;

    public BrowsePlantsHandler(MyFarmDbContext dbContext, IUserAccessor userAccessor)
    {
        _dbContext = dbContext;
        _userAccessor = userAccessor;
    }

    public async Task<List<PlantDto>> Handle(BrowsePlantsQuery request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Plants.Where(p => p.Season.Farm.UserId == _userAccessor.GetUserIdAsGuid());

        var plants = await query.Select(p => new PlantDto
        {
            Id = p.Id,
            Name = p.Name,
            FieldId = p.FieldId.ToString(),
            SeasonId = p.SeasonId.ToString()
        }).ToListAsync(cancellationToken);

        return plants;
    }
}