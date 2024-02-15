using MediatR;

namespace Application.Modules.Farms.Queries.BrowseFarms;

public record BrowseFarmsQuery() : IRequest<List<FarmsDto>>;