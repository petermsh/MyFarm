using Application.Abstractions;

namespace Application.Modules.Seasons.Exceptions;

public class SeasonNotFoundException : ProjectException
{
    private Guid Id { get; }
    
    public SeasonNotFoundException(Guid id) : base($"Farm with id: {id} not found")
    {
        Id = id;
    }
}