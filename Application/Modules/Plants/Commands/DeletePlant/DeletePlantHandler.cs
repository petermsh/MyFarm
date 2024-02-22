using Application.Modules.Plants.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Plants.Commands.DeletePlant;

internal sealed class DeletePlantHandler : IRequestHandler<DeletePlantCommand>
{
    private readonly IPlantRepository _plantRepository;

    public DeletePlantHandler(IPlantRepository plantRepository)
    {
        _plantRepository = plantRepository;
    }

    public async Task Handle(DeletePlantCommand request, CancellationToken cancellationToken)
    {
        var plant = await _plantRepository.GetAsync(request.Id, cancellationToken);
        
        if(plant is null)
            throw new PlantNotFoundException(request.Id);

        await _plantRepository.RemoveAsync(plant, cancellationToken);
    }
}