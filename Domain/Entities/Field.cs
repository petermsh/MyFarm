namespace Domain.Entities;

public sealed class Field : BaseEntity
{
    public string Location { get; set; }
    
    public float Area { get; set; }
    public int Number { get; set; }
    
    public Guid FarmId { get; set; }
    public Farm Farm { get; set; }

    private Field(string location, float area, int number, Guid farmId)
    {
        Id = Guid.NewGuid();
        Location = location;
        Area = area;
        Number = number;
        FarmId = farmId;
    }

    public static Field Create(string location, float area, int number, Guid farmId)
        => new(location, area, number, farmId);

    public void Update(string location, float area, int number)
    {
        Location = location;
        Area = area;
        Number = number;
    }
}