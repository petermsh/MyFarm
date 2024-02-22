using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Modules.Plants.Commands.CreatePlant;

internal sealed class CreatePlantHandler : IRequestHandler<CreatePlantCommand, CreatePlantResponse>
{
    private readonly IPlantRepository _plantRepository;

    public CreatePlantHandler(IPlantRepository plantRepository)
    {
        _plantRepository = plantRepository;
    }

    public async Task<CreatePlantResponse> Handle(CreatePlantCommand request, CancellationToken cancellationToken)
    {
        var plant = Plant.Create(request.Name, new Guid(request.FieldId), new Guid(request.SeasonId));

        await _plantRepository.AddAsync(plant, cancellationToken);

        return new CreatePlantResponse(plant.Id.ToString());
    }
}