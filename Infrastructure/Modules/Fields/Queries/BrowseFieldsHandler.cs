using Application.Interfaces;
using Application.Modules.Fields.Queries.BrowseFields;
using Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Fields.Queries;

internal sealed class BrowseFieldsHandler : IRequestHandler<BrowseFieldsQuery, List<FieldDto>>
{
    private readonly MyFarmDbContext _dbContext;
    private readonly IUserAccessor _userAccessor;

    public BrowseFieldsHandler(MyFarmDbContext dbContext, IUserAccessor userAccessor)
    {
        _dbContext = dbContext;
        _userAccessor = userAccessor;
    }

    public async Task<List<FieldDto>> Handle(BrowseFieldsQuery request, CancellationToken cancellationToken)
    {
        var query = _dbContext.Fields.Where(f => f.Farm.UserId == _userAccessor.GetUserIdAsGuid());

        if (request.FarmId.HasValue)
            query = query.Where(q => q.FarmId == request.FarmId);
        
        var fields = await query.Select(f => new FieldDto
            {
                Id = f.Id,
                Name = f.Name,
                Area = f.Area,
                Location = f.Location,
                Number = f.Number,
                CreatedAt = f.CreatedAt
            }).ToListAsync(cancellationToken);

        return fields;
    }
}