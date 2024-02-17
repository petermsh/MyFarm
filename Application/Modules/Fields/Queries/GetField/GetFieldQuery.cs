using MediatR;

namespace Application.Modules.Fields.Queries.GetField;

public class GetFieldQuery : IRequest<GetFieldResponse>
{
    public Guid Id { get; init; }
}