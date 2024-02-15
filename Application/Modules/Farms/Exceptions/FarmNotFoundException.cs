using Application.Abstractions;

namespace Application.Modules.Farms.Exceptions;

public class FarmNotFoundException : ProjectException
{
    private Guid Id { get; }
    
    public FarmNotFoundException(Guid id) : base($"Farm with id: {id} not found")
    {
        Id = id;
    }
}