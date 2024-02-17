using Application.Modules.Fields.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Fields.Commands.DeleteField;

internal sealed class DeleteFieldHandler : IRequestHandler<DeleteFieldCommand>
{
    private readonly IFieldRepository _fieldRepository;

    public DeleteFieldHandler(IFieldRepository fieldRepository)
    {
        _fieldRepository = fieldRepository;
    }

    public async Task Handle(DeleteFieldCommand request, CancellationToken cancellationToken)
    {
        var field = await _fieldRepository.GetAsync(request.Id, cancellationToken);

        if (field is null)
            throw new FieldNotFoundException(request.Id);

        await _fieldRepository.RemoveAsync(field, cancellationToken);
    }
}