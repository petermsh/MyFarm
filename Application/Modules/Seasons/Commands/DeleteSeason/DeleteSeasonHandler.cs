using Application.Modules.Seasons.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Seasons.Commands.DeleteSeason;

internal sealed class DeleteSeasonHandler : IRequestHandler<DeleteSeasonCommand>
{
    private readonly ISeasonRepository _seasonRepository;

    public DeleteSeasonHandler(ISeasonRepository seasonRepository)
    {
        _seasonRepository = seasonRepository;
    }

    public async Task Handle(DeleteSeasonCommand request, CancellationToken cancellationToken)
    {
        var season = await _seasonRepository.GetAsync(request.Id, cancellationToken);

        if (season is null)
            throw new SeasonNotFoundException(request.Id);

        await _seasonRepository.RemoveAsync(season, cancellationToken);
    }
}