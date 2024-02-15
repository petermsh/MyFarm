using MediatR;

namespace Application.Modules.Operations.Queries.GetOperation;

public class GetOperationQuery : IRequest<GetOperationResponse>
{
    public Guid Id { get; init; }
}