using Application.Modules.Seasons.Exceptions;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Seasons.Commands.CreateSeason;

internal sealed class CreateSeasonHandler : IRequestHandler<CreateSeasonCommand, CreateSeasonResponse>
{
    private readonly ISeasonRepository _seasonRepository;
    private readonly IFarmRepository _farmRepository;

    public CreateSeasonHandler(ISeasonRepository seasonRepository, IFarmRepository farmRepository)
    {
        _seasonRepository = seasonRepository;
        _farmRepository = farmRepository;
    }

    public async Task<CreateSeasonResponse> Handle(CreateSeasonCommand request, CancellationToken cancellationToken)
    {
        var season = Season.Create(request.Name, new Guid(request.FarmId));

        await _seasonRepository.AddAsync(season, cancellationToken);

        var farm = await _farmRepository.GetAsync(season.FarmId, cancellationToken);

        if (farm is null)
            throw new CannotAddSeasonToFarmException();
        
        farm.Seasons.Add(season);
        await _farmRepository.SaveChangesAsync(farm, cancellationToken);

        return new CreateSeasonResponse(season.Id);
    }
}