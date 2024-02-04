using MediatR;

namespace Application.Farms.Queries.GetFarm;

public class GetFarmQuery : IRequest<GetFarmResponse>
{
    public Guid Id { get; set; }
}