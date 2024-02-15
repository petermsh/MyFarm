using MediatR;

namespace Application.Modules.Seasons.Commands.DeleteSeason;

public class DeleteSeasonCommand : IRequest
{
    public Guid Id { get; set; }    
}