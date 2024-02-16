using Application.Modules.Seasons.Queries.BrowseSeasons;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace Infrastructure.Modules.Seasons.Queries;

internal sealed class BrowseSeasonsHandler : IRequestHandler<BrowseSeasonsQuery, List<SeasonDto>>
{
    private readonly MyFarmDbContext _dbContext;

    public BrowseSeasonsHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<SeasonDto>> Handle(BrowseSeasonsQuery request, CancellationToken cancellationToken)
    {
        var seasons = await _dbContext.Seasons
            .Select(f => new SeasonDto()
            {
                Id = f.Id,
                Name = f.Name,
                Status = f.Status.GetDisplayName()
            }).ToListAsync(cancellationToken);

        return seasons;
    }
}