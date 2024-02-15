using Domain.Enums;

namespace Domain.Entities;

public sealed class Season : BaseEntity
{
    public string Name { get; set; }
    public SeasonStatus Status { get; set; }
    
    public Guid FarmId { get; set; }
    public Farm Farm { get; set; }
    public ICollection<Operation> Operations { get; set; }


    private Season(string name, Guid farmId)
    {
        Id = new Guid();
        Status = SeasonStatus.Active;
        Name = name;
        FarmId = farmId;
    }
    public static Season Create(string name, Guid farmId) => new(name, farmId);

    public void Update(string name)
        => Name = name;
    
}