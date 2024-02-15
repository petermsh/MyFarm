using Application.Modules.Seasons.Exceptions;
using Application.Modules.Seasons.Queries.GetSeason;
using Domain.Enums;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Seasons.Queries;

internal sealed class GetSeasonHandler : IRequestHandler<GetSeasonQuery, GetSeasonResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public GetSeasonHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetSeasonResponse> Handle(GetSeasonQuery request, CancellationToken cancellationToken)
    {
        var season = await _dbContext.Seasons
            .AsNoTracking()
            .Where(f => f.Id == request.Id)
            .Select(f => new GetSeasonResponse
            {
                Id = f.Id,
                Name = f.Name,
                Status = f.Status,
                CreatedAt = f.CreatedAt
            }).SingleOrDefaultAsync(cancellationToken);

        if(season is null)
            throw new SeasonNotFoundException(request.Id);
        
        return season;
    }
}