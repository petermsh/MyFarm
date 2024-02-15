using Application.Modules.Operations.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Operations.Commands.UpdateOperation;

internal sealed class UpdateOperationHandler : IRequestHandler<UpdateOperationCommand>
{
    private readonly IOperationRepository _operationRepository;

    public UpdateOperationHandler(IOperationRepository operationRepository)
    {
        _operationRepository = operationRepository;
    }

    public async Task Handle(UpdateOperationCommand request, CancellationToken cancellationToken)
    {
        var operation = await _operationRepository.GetAsync(request.Id, cancellationToken);

        if (operation is null)
            throw new OperationNotFoundException(request.Id);

        operation.Update(request.Name, request.OperationType, request.Value);
        await _operationRepository.Update(operation, cancellationToken);
    }
}