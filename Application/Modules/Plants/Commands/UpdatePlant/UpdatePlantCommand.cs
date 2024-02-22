using MediatR;

namespace Application.Modules.Plants.Commands.UpdatePlant;

public record UpdatePlantCommand(Guid Id, string Name) : IRequest;