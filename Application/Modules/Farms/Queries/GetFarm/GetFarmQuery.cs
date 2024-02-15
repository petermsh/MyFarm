using MediatR;

namespace Application.Modules.Farms.Queries.GetFarm;

public class GetFarmQuery : IRequest<GetFarmResponse>
{
    public Guid Id { get; set; }
}