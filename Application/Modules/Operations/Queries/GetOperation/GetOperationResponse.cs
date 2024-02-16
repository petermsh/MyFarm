using Domain.Enums;

namespace Application.Modules.Operations.Queries.GetOperation;

public class GetOperationResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string OperationType { get; set; }
    public float Value { get; set; }
    public Guid SeasonId { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}