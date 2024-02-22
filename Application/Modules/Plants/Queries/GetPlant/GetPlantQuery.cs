using MediatR;

namespace Application.Modules.Plants.Queries.GetPlant;

public class GetPlantQuery : IRequest<GetPlantResponse>
{
    public Guid Id { get; set; }
}