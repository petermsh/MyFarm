using Application.Farms.Exceptions;
using Domain.Repositories;
using MediatR;

namespace Application.Farms.Commands.DeleteFarm;

public class DeleteFarmHandler : IRequestHandler<DeleteFarmCommand>
{
    private readonly IFarmRepository _farmRepository;

    public DeleteFarmHandler(IFarmRepository farmRepository)
    {
        _farmRepository = farmRepository;
    }

    public async Task Handle(DeleteFarmCommand request, CancellationToken cancellationToken)
    {
        var farm = await _farmRepository.GetAsync(request.Id, cancellationToken);

        if(farm is null)
            throw new FarmNotFoundException(request.Id);
        
        await _farmRepository.RemoveAsync(farm, cancellationToken);
    }
}