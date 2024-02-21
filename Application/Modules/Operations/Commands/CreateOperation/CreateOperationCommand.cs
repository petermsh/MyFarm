﻿using Domain.Enums;
using MediatR;

namespace Application.Modules.Operations.Commands.CreateOperation;

public record CreateOperationCommand(string Name, OperationType OperationType, float Value, string SeasonId, DateTimeOffset Date) : IRequest<CreateOperationResponse>;