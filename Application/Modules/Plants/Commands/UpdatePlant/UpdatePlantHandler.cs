using Application.Modules.Plants.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Plants.Commands.UpdatePlant;

internal sealed class UpdatePlantHandler : IRequestHandler<UpdatePlantCommand>
{
    private readonly IPlantRepository _plantRepository;

    public UpdatePlantHandler(IPlantRepository plantRepository)
    {
        _plantRepository = plantRepository;
    }

    public async Task Handle(UpdatePlantCommand request, CancellationToken cancellationToken)
    {
        var plant = await _plantRepository.GetAsync(request.Id, cancellationToken);
        
        if(plant is null)
            throw new PlantNotFoundException(request.Id);
        
        plant.Update(request.Name);
        await _plantRepository.Update(plant, cancellationToken);
    }
}