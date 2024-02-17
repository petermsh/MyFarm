using Application.Modules.Operations.Queries.BrowseOperations;
using Application.Modules.Seasons.Exceptions;
using Application.Modules.Seasons.Queries.GetSeason;
using Domain.Enums;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

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
            .Include(s=>s.Operations)
            .Where(s => s.Id == request.Id)
            .Select(s => new GetSeasonResponse
            {
                Id = s.Id,
                Name = s.Name,
                Status = s.Status.GetDisplayName(),
                Earnings = s.Operations.Where(o=>o.OperationType == OperationType.Earning).Sum(o=>o.Value),
                Expenses = s.Operations.Where(o=>o.OperationType == OperationType.Expense).Sum(o=>o.Value),
                CreatedAt = s.CreatedAt,
            }).SingleOrDefaultAsync(cancellationToken);

        if(season is null)
            throw new SeasonNotFoundException(request.Id);
        
        return season;
    }
}