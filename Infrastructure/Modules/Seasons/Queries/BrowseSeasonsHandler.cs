using Application.Interfaces;
using Application.Modules.Seasons.Queries.BrowseSeasons;
using Domain.Enums;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace Infrastructure.Modules.Seasons.Queries;

internal sealed class BrowseSeasonsHandler : IRequestHandler<BrowseSeasonsQuery, List<SeasonDto>>
{
    private readonly MyFarmDbContext _dbContext;
    private readonly IUserAccessor _userAccessor;

    public BrowseSeasonsHandler(MyFarmDbContext dbContext, IUserAccessor userAccessor)
    {
        _dbContext = dbContext;
        _userAccessor = userAccessor;
    }

    public async Task<List<SeasonDto>> Handle(BrowseSeasonsQuery request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Seasons
            .Include(q=>q.Operations)
            .Where(q => q.Farm.UserId == _userAccessor.GetUserIdAsGuid());

        if (request.FarmId.HasValue)
            query = query.Where(q => q.FarmId == request.FarmId);
        
        var seasons = await 
            query.Select(s => new SeasonDto()
            {
                Id = s.Id,
                Name = s.Name,
                Status = s.Status.GetDisplayName(),
                Earnings = s.Operations.Where(o=>o.OperationType == OperationType.Earning).Sum(o=>o.Value),
                Expenses = s.Operations.Where(o=>o.OperationType == OperationType.Expense).Sum(o=>o.Value)
            }).ToListAsync(cancellationToken);

        return seasons;
    }
}