namespace Application.Modules.Fields.Queries.GetField;

public class GetFieldResponse
{
    public Guid Id { get; set; }
    public string Location { get; set; }
    public float Area { get; set; }
    public int Number { get; set; }
    public Guid FarmId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}