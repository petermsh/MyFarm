using MediatR;

namespace Application.Modules.Seasons.Commands.UpdateSeason;

public record UpdateSeasonCommand(Guid Id, string Name) : IRequest;