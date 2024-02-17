using MediatR;

namespace Application.Modules.Fields.Commands.CreateField;

public record CreateFieldCommand(string Location, float Area, int Number, string FarmId) : IRequest<CreateFieldResponse>;