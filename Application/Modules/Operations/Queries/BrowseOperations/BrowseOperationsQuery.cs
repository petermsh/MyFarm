using MediatR;

namespace Application.Modules.Operations.Queries.BrowseOperations;

public record BrowseOperationsQuery : IRequest<List<OperationDto>>
{
    public Guid? SeasonId { get; set; }
    public Guid? FieldId { get; set; }
}