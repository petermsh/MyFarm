using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Operations.Commands.CreateOperation;

internal sealed class CreateOperationHandler : IRequestHandler<CreateOperationCommand, CreateOperationResponse>
{
    private readonly IOperationRepository _operationRepository;

    public CreateOperationHandler(IOperationRepository operationRepository)
    {
        _operationRepository = operationRepository;
    }

    public async Task<CreateOperationResponse> Handle(CreateOperationCommand request, CancellationToken cancellationToken)
    {
        var operation = Operation.Create(request.Name, request.OperationType, request.Value, new Guid(request.SeasonId), request.Date);

        await _operationRepository.AddAsync(operation, cancellationToken);

        return new CreateOperationResponse(operation.Id);
    }
}