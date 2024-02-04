
namespace Domain.Entities;

public sealed class Farm : BaseEntity
{
    public string Address { get; set; }

    public ICollection<Field> Fields { get; set; }

    private Farm(string address)
    {
        Id = Guid.NewGuid();
        Address = address;
    }

    public static Farm Create(string address) => new(address);

    public void Update(string address)
    {
        Address = address;
    }

}

