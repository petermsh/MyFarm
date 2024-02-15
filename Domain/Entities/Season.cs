using Domain.Enums;

namespace Domain.Entities;

public sealed class Season : BaseEntity
{
    public string Name { get; set; }
    public SeasonStatus Status { get; set; }

    public Guid FarmId { get; set; }
    public Farm Farm { get; set; }
    public ICollection<Operation> Operations { get; set; }
}