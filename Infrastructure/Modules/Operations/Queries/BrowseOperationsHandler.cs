using Application.Modules.Operations.Queries.BrowseOperations;
using Domain.Repositories;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace Infrastructure.Modules.Operations.Queries;

internal sealed class BrowseOperationsHandler : IRequestHandler<BrowseOperationsQuery, List<OperationDto>>
{
    private readonly MyFarmDbContext _dbContext;
    
    public BrowseOperationsHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<OperationDto>> Handle(BrowseOperationsQuery request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Operations.AsQueryable();

        if (request.SeasonId.HasValue)
            query = query.Where(o => o.SeasonId == request.SeasonId);

        var operations = await query
            .Select(o => new OperationDto
            {
                Id = o.Id,
                Name = o.Name,
                OperationType = o.OperationType.GetDisplayName(),
                Value = o.Value,
                CreatedAt = o.CreatedAt
            }).ToListAsync(cancellationToken);

        return operations;
    }
}