using Domain.Enums;

namespace Domain.Entities;

public sealed class Operation : BaseEntity
{
    public string Name { get; set; }
    public OperationType OperationType { get; set; }
    public float Value { get; set; }
    public DateTimeOffset Date { get; set; }
    
    public Guid SeasonId { get; set; }
    public Season Season { get; set; }

    private Operation(string name, OperationType operationType, float value, Guid seasonId, DateTimeOffset date)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
        SeasonId = seasonId;
        Date = date;
    }

    public static Operation Create(string name, OperationType operationType, float value, Guid seasonId, DateTimeOffset date)
        => new(name, operationType, value, seasonId, date);

    public void Update(string name, OperationType operationType, float value)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
    }
}