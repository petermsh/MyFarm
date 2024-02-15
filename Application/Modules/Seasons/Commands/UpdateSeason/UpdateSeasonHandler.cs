using Application.Modules.Seasons.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Seasons.Commands.UpdateSeason;

internal sealed class UpdateSeasonHandler : IRequestHandler<UpdateSeasonCommand>
{
    private readonly ISeasonRepository _seasonRepository;

    public UpdateSeasonHandler(ISeasonRepository seasonRepository)
    {
        _seasonRepository = seasonRepository;
    }

    public async Task Handle(UpdateSeasonCommand request, CancellationToken cancellationToken)
    {
        var season = await _seasonRepository.GetAsync(request.Id, cancellationToken);

        if (season is null)
            throw new SeasonNotFoundException(request.Id);
        
        season.Update(request.Name);

        await _seasonRepository.SaveChangesAsync(season, cancellationToken);
    }
}