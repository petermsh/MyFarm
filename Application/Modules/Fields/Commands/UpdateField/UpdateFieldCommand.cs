using MediatR;

namespace Application.Modules.Fields.Commands.UpdateField;

public record UpdateFieldCommand(Guid Id, string Location, float Area, int Number) : IRequest;