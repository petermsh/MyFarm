using MediatR;

namespace Application.Modules.Operations.Queries.GetGroupedOperations;

public record GetGroupedOperationsQuery(Guid FieldId) : IRequest<List<GroupedOperationsResponse>>;