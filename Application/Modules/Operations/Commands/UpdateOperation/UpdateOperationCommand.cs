using Domain.Enums;
using MediatR;

namespace Application.Modules.Operations.Commands.UpdateOperation;

public record UpdateOperationCommand(Guid Id, string Name, OperationType OperationType, float Value) : IRequest;