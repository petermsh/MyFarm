
namespace Domain.Entities;

public sealed class Farm : BaseEntity
{
    public string Name { get; set; }
    public string Address { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }
    public ICollection<Field> Fields { get; set; }
    public ICollection<Season> Seasons { get; set; }


    private Farm(string address, string name, Guid userId)
    {
        Id = Guid.NewGuid();
        Address = address;
        Name = name;
        UserId = userId;
    }

    public static Farm Create(string address, string name, Guid userId) => new(address, name, userId);

    public void Update(string address, string name)
    {
        Address = address;
        Name = name;
    }

}

