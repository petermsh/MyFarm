using Application.Farms.Exceptions;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Farms.Commands.CreateFarm;

internal sealed class CreateFarmHandler : IRequestHandler<CreateFarmCommand, CreateFarmResponse>
{
    private readonly IFarmRepository _farmRepository;

    public CreateFarmHandler(IFarmRepository farmRepository)
    {
        _farmRepository = farmRepository;
    }
    
    public async Task<CreateFarmResponse> Handle(CreateFarmCommand command, CancellationToken cancellationToken)
    {
        var farm = Farm.Create(command.Address);

        await _farmRepository.AddAsync(farm, cancellationToken);

        return new CreateFarmResponse(farm.Id);
    }
    
}