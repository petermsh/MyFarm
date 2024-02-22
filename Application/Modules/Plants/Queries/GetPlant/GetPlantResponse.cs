namespace Application.Modules.Plants.Queries.GetPlant;

public class GetPlantResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string SeasonId { get; set; }
    public string FieldId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}