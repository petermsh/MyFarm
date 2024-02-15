using Application.Farms.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.Farms.Commands.CreateFarm;

internal sealed class CreateFarmHandler : IRequestHandler<CreateFarmCommand, CreateFarmResponse>
{
    private readonly IFarmRepository _farmRepository;
    private readonly IUserAccessor _userAccessor;

    public CreateFarmHandler(IFarmRepository farmRepository, IUserAccessor userAccessor)
    {
        _farmRepository = farmRepository;
        _userAccessor = userAccessor;
    }
    
    public async Task<CreateFarmResponse> Handle(CreateFarmCommand command, CancellationToken cancellationToken)
    {
        var farm = Farm.Create(command.Address, command.Name, new Guid(_userAccessor.GetUserId()));

        await _farmRepository.AddAsync(farm, cancellationToken);

        return new CreateFarmResponse(farm.Id);
    }
    
}