using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Application.Modules.Operations.Exceptions;
using Application.Modules.Operations.Queries.GetOperation;
using Domain.Enums;
using Infrastructure.InfraExtensions;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace Infrastructure.Modules.Operations.Queries;

internal sealed class GetOperationHandler : IRequestHandler<GetOperationQuery, GetOperationResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public GetOperationHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetOperationResponse> Handle(GetOperationQuery request, CancellationToken cancellationToken)
    {
        var operation = await _dbContext.Operations
            .AsNoTracking()
            .Where(o => o.Id == request.Id)
            .Select(o => new GetOperationResponse
            {
                Id = o.Id,
                Name = o.Name,
                OperationType = o.OperationType.GetDisplayName(),
                Value = o.Value,
                Date = o.Date,
                SeasonId = o.SeasonId,
                CreatedAt = o.CreatedAt
            }).SingleOrDefaultAsync(cancellationToken);

        if (operation is null)
            throw new OperationNotFoundException(request.Id);

        return operation;
    }
}