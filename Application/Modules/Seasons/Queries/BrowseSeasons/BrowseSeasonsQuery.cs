using MediatR;

namespace Application.Modules.Seasons.Queries.BrowseSeasons;

public record BrowseSeasonsQuery : IRequest<List<SeasonDto>>;