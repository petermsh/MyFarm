namespace Application.Modules.Plants.Queries.BrowsePlants;

public class PlantDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string SeasonId { get; set; }
    public string FieldId { get; set; }
}