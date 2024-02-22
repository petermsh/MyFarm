using Application.Abstractions;

namespace Application.Modules.Plants.Exceptions;

public class PlantNotFoundException : ProjectException
{
    private Guid Id { get; set; }
    
    public PlantNotFoundException(Guid id) : base($"Plant with id: {id} not found")
    {
        Id = id;
    }
}