using MediatR;

namespace Application.Modules.Seasons.Commands.CreateSeason;

public record CreateSeasonCommand(string Name, string FarmId) : IRequest<CreateSeasonResponse>;