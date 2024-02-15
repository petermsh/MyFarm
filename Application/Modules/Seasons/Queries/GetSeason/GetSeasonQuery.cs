using MediatR;

namespace Application.Modules.Seasons.Queries.GetSeason;

public class GetSeasonQuery : IRequest<GetSeasonResponse>
{
    public Guid Id { get; init; }
}