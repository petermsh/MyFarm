namespace Application.Modules.Fields.Queries.BrowseFields;

public class FieldDto
{
    public Guid Id { get; set; }
    public string Location { get; set; }
    public float Area { get; set; }
    public int Number { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}