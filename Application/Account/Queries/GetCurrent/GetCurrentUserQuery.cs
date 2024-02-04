using MediatR;

namespace Application.Account.Queries.GetCurrent;

public record GetCurrentUserQuery : IRequest<GetCurrentUserResponse>;