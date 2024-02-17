using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Fields.Commands.CreateField;

internal sealed class CreateFieldHandler : IRequestHandler<CreateFieldCommand, CreateFieldResponse>
{
    private readonly IFieldRepository _fieldRepository;

    public CreateFieldHandler(IFieldRepository fieldRepository)
    {
        _fieldRepository = fieldRepository;
    }

    public async Task<CreateFieldResponse> Handle(CreateFieldCommand request, CancellationToken cancellationToken)
    {
        var field = Field.Create(request.Location, request.Area, request.Number, new Guid(request.FarmId));
        
        await _fieldRepository.AddAsync(field, cancellationToken);

        return new CreateFieldResponse(field.Id);
    }
}