﻿using Domain.Enums;

namespace Application.Modules.Operations.Queries.BrowseOperations;

public class OperationDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public OperationType OperationType { get; set; }
    public float Value { get; set; }
}