using Application.Modules.Fields.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Fields.Commands.UpdateField;

internal sealed class UpdateFieldHandler : IRequestHandler<UpdateFieldCommand>
{
    private readonly IFieldRepository _fieldRepository;

    public UpdateFieldHandler(IFieldRepository fieldRepository)
    {
        _fieldRepository = fieldRepository;
    }

    public async Task Handle(UpdateFieldCommand request, CancellationToken cancellationToken)
    {
        var field = await _fieldRepository.GetAsync(request.Id, cancellationToken);

        if (field is null)
            throw new FieldNotFoundException(request.Id);

        field.Update(request.Location, request.Area, request.Number);
        await _fieldRepository.Update(field, cancellationToken);
    }
}