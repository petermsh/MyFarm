using MediatR;

namespace Application.Modules.Operations.Commands.DeleteOperation;

public class DeleteOperationCommand : IRequest
{
    public Guid Id { get; set; }
}