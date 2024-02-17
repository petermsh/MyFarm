using MediatR;

namespace Application.Modules.Fields.Commands.DeleteField;

public class DeleteFieldCommand : IRequest
{
    public Guid Id { get; set; }
}