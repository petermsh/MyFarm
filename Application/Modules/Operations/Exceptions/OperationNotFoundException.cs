using Application.Abstractions;

namespace Application.Modules.Operations.Exceptions;

public class OperationNotFoundException : ProjectException
{
    private Guid Id { get; set; }
    
    public OperationNotFoundException(Guid id) : base($"Operation with id: {id} not found")
    {
        Id = id;
    }
}