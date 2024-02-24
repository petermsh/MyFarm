using MediatR;

namespace Application.Modules.Fields.Commands.CreateField;

public record CreateFieldCommand(string Name, string Location, float Area, int Number, string FarmId) : IRequest<CreateFieldResponse>;