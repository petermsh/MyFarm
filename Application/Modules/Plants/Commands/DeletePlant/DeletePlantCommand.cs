using MediatR;

namespace Application.Modules.Plants.Commands.DeletePlant;

public class DeletePlantCommand : IRequest
{
    public Guid Id { get; set; }
}