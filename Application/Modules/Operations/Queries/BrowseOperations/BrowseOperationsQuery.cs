using MediatR;

namespace Application.Modules.Operations.Queries.BrowseOperations;

public record BrowseOperationsQuery: IRequest<List<OperationDto>>;