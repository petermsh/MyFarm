using Application.Farms.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Farms.Commands.UpdateFarm;

internal sealed class UpdateFarmHandler : IRequestHandler<UpdateFarmCommand>
{
    private readonly IFarmRepository _farmRepository;

    public UpdateFarmHandler(IFarmRepository farmRepository)
    {
        _farmRepository = farmRepository;
    }

    public async Task Handle(UpdateFarmCommand request, CancellationToken cancellationToken)
    {
        var farm = await _farmRepository.GetAsync(request.Id, cancellationToken);

        if(farm is null)
            throw new FarmNotFoundException(request.Id);
        
        farm.Update(request.Address, request.Name);

        await _farmRepository.SaveChangesAsync(farm, cancellationToken);
    }
}