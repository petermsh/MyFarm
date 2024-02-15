using Domain.Enums;

namespace Domain.Entities;

public sealed class Operation : BaseEntity
{
    public string Name { get; set; }
    public OperationType OperationType { get; set; }
    public float Value { get; set; }
    
    public Guid SeasonId { get; set; }
    public Season Season { get; set; }
}