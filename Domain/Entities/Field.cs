﻿namespace Domain.Entities;

public sealed class Field : BaseEntity
{
    public string Location { get; set; }
    public string Name { get; set; }
    public float Area { get; set; }
    public int Number { get; set; }
    
    public Guid FarmId { get; set; }
    public Farm Farm { get; set; }
    public ICollection<Plant> Plants { get; set; }
    public ICollection<Operation> Operations { get; set; }

    private Field(string name, string location, float area, int number, Guid farmId)
    {
        Id = Guid.NewGuid();
        Name = name;
        Location = location;
        Area = area;
        Number = number;
        FarmId = farmId;
    }

    public static Field Create(string name, string location, float area, int number, Guid farmId)
        => new(name, location, area, number, farmId);

    public void Update(string location, float area, int number)
    {
        Location = location;
        Area = area;
        Number = number;
    }
}