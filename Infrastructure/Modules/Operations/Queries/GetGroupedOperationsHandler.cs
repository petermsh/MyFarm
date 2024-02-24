using Application.Interfaces;
using Application.Modules.Operations.Queries.GetGroupedOperations;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace Infrastructure.Modules.Operations.Queries;

internal sealed class GetGroupedOperationsHandler : IRequestHandler<GetGroupedOperationsQuery, List<GroupedOperationsResponse>>
{
    private readonly MyFarmDbContext _dbContext;

    public GetGroupedOperationsHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GroupedOperationsResponse>> Handle(GetGroupedOperationsQuery request, CancellationToken cancellationToken)
    {
        var query = await _dbContext.Operations
            .Where(o => o.FieldId == request.FieldId)
            .GroupBy(o => new { o.Season.Name, PlantName = o.Field.Plants.FirstOrDefault(p => p.Season.Name == o.Season.Name).Name })
            .OrderByDescending(group => group.Key.Name) 
            .Select(group => new GroupedOperationsResponse
            {
                SeasonName = group.Key.Name,
                PlantName = group.Key.PlantName,
                Operations = group.OrderByDescending(o => o.Date) 
                    .Select(o => new GroupedOperationsResponse.OperationDetailsDto
                    {
                        Id = o.Id,
                        Name = o.Name,
                        OperationType = o.OperationType.GetDisplayName(),
                        Value = o.Value,
                        Date = o.Date
                    }).ToList()
            })
            .ToListAsync(cancellationToken);
    
        return query;
        
    }
}