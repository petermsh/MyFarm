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
    public Guid FieldId { get; set; }
    public Field Field { get; set; }

    private Operation(string name, OperationType operationType, float value, Guid seasonId, Guid fieldId, DateTimeOffset date)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
        SeasonId = seasonId;
        FieldId = fieldId;
        Date = date;
    }

    public static Operation Create(string name, OperationType operationType, float value, Guid seasonId, Guid fieldId, DateTimeOffset date)
        => new(name, operationType, value, seasonId, fieldId, date);

    public void Update(string name, OperationType operationType, float value)
    {
        Name = name;
        OperationType = operationType;
        Value = value;
    }
}