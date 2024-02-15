using MediatR;

namespace Application.Modules.Farms.Commands.DeleteFarm;

public class DeleteFarmCommand : IRequest
{
    public Guid Id { get; set; }
}