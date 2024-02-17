using Application.Modules.Fields.Queries.GetField;
using Domain.Entities;

namespace Infrastructure.Modules.Fields;

public static class Extensions
{
    public static GetFieldResponse AsResponse(this Field entity)
        => new()
        {
            Id = entity.Id,
            Location = entity.Location,
            Area = entity.Area,
            Number = entity.Number,
            CreatedAt = entity.CreatedAt
        };
}