using Application.Modules.Plants.Queries.GetPlant;
using Domain.Entities;

namespace Infrastructure.Modules.Plants;

public static class Extensions
{
    public static GetPlantResponse AsResponse(this Plant entity)
        => new()
        {
            Id = entity.Id,
            Name = entity.Name,
            SeasonId = entity.SeasonId.ToString(),
            FieldId = entity.FieldId.ToString(),
            CreatedAt = entity.CreatedAt
        };
}