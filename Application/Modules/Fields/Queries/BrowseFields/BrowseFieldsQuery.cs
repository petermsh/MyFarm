using MediatR;

namespace Application.Modules.Fields.Queries.BrowseFields;

public record BrowseFieldsQuery : IRequest<List<FieldDto>>
{
    public Guid? FarmId { get; set; }
}