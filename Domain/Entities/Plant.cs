namespace Domain.Entities;

public sealed class Plant : BaseEntity
{
    public string Name { get; set; }
    
    public Guid FieldId { get; set; }
    public Field Field { get; set; }
    public Guid SeasonId { get; set; }
    public Season Season { get; set; }


    private Plant(string name, Guid fieldId, Guid seasonId)
    {
        Id = Guid.NewGuid();
        Name = name;
        FieldId = fieldId;
        SeasonId = seasonId;
    }

    public static Plant Create(string name, Guid fieldId, Guid seasonId)
        => new(name, fieldId, seasonId);

    public void Update(string name)
    {
        Name = name;
    }
}