using Application.Abstractions;

namespace Application.Modules.Fields.Exceptions;

public class FieldNotFoundException : ProjectException
{
    private Guid Id { get; set; }
    
    public FieldNotFoundException(Guid id) : base($"Field with id: {id} not found")
    {
        Id = id;
    }
}