using MediatR;

namespace Application.Farms.Commands.UpdateFarm;

public record UpdateFarmCommand(Guid Id, string Address, string Name) : IRequest;