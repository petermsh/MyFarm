using Application.Modules.Operations.Queries.BrowseOperations;
using Domain.Repositories;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
        var operations = await _dbContext.Operations
            .Select(o => new OperationDto
            {
                Id = o.Id,
                Name = o.Name,
                OperationType = o.OperationType,
                Value = o.Value
            }).ToListAsync(cancellationToken);

        return operations;
    }
}