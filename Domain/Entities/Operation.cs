using Domain.Enums;

namespace Domain.Entities;

public sealed class Operation : BaseEntity
{
    public string Name { get; set; }
    public OperationType OperationType { get; set; }
    public float Value { get; set; }
    
    public Guid SeasonId { get; set; }
    public Season Season { get; set; }

    private Operation(string name, OperationType operationType, float value, Guid seasonId)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
        SeasonId = seasonId;
    }

    public static Operation Create(string name, OperationType operationType, float value, Guid seasonId)
        => new(name, operationType, value, seasonId);

    public void Update(string name, OperationType operationType, float value)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
    }
}