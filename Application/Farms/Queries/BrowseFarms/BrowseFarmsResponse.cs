namespace Application.Farms.Queries.BrowseFarms;

public class BrowseFarmsResponse
{
    public BrowseFarmsResponse(ICollection<Farms> farmsList)
    {
        FarmsList = farmsList;
    }
    
    public ICollection<Farms> FarmsList { get; set; }

    public record Farms
    {
        public Guid Id { get; set; }
        public string Address { get; set; }
    }
}