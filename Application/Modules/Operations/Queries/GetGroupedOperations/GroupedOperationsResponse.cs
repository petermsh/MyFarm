namespace Application.Modules.Operations.Queries.GetGroupedOperations;

public class GroupedOperationsResponse
{
    public string SeasonName { get; set; }
    public string PlantName { get; set; }
    public ICollection<OperationDetailsDto> Operations { get; set; }

    public class OperationDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string OperationType { get; set; }
        public float Value { get; set; }
        public DateTimeOffset Date { get; set; }
    }
}