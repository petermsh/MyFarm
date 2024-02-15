using Application.Modules.Operations.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Operations.Commands.DeleteOperation;

internal sealed class DeleteOperationHandler : IRequestHandler<DeleteOperationCommand>
{
    private readonly IOperationRepository _operationRepository;

    public DeleteOperationHandler(IOperationRepository operationRepository)
    {
        _operationRepository = operationRepository;
    }

    public async Task Handle(DeleteOperationCommand request, CancellationToken cancellationToken)
    {
        var operation = await _operationRepository.GetAsync(request.Id, cancellationToken);

        if (operation is null)
            throw new OperationNotFoundException(request.Id);

        await _operationRepository.RemoveAsync(operation, cancellationToken);
    }
}