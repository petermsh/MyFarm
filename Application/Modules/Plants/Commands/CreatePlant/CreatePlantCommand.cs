using MediatR;

namespace Application.Modules.Plants.Commands.CreatePlant;

public record CreatePlantCommand(string Name, string FieldId, string SeasonId) : IRequest<CreatePlantResponse>;