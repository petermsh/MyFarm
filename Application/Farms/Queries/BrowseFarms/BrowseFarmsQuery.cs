using MediatR;

namespace Application.Farms.Queries.BrowseFarms;

public record BrowseFarmsQuery() : IRequest<BrowseFarmsResponse>;