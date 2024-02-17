using Application.Modules.Fields.Exceptions;
using Application.Modules.Fields.Queries.GetField;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Fields.Queries;

internal sealed class GetFieldHandler : IRequestHandler<GetFieldQuery, GetFieldResponse>
{
    private readonly MyFarmDbContext _dbContext;

    public GetFieldHandler(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetFieldResponse> Handle(GetFieldQuery request, CancellationToken cancellationToken)
    {
        var field = await _dbContext.Fields
            .AsNoTracking()
            .Where(f => f.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        if (field is null)
            throw new FieldNotFoundException(request.Id);

        return field.AsResponse();
    }
}