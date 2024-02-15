namespace Application.Farms.Queries.GetFarm;

public record GetFarmResponse
{
    public Guid Id { get; set; }
    public string Address { get; set; }
    public string Name { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}