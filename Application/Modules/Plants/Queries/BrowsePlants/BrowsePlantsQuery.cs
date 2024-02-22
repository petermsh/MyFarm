using MediatR;

namespace Application.Modules.Plants.Queries.BrowsePlants;

public record BrowsePlantsQuery : IRequest<List<PlantDto>>;