using MediatR;

namespace Application.Farms.Commands.DeleteFarm;

public class DeleteFarmCommand : IRequest
{
    public Guid Id { get; set; }
}