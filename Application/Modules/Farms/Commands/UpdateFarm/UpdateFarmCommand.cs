using MediatR;

namespace Application.Modules.Farms.Commands.UpdateFarm;

public record UpdateFarmCommand(Guid Id, string Address, string Name) : IRequest;