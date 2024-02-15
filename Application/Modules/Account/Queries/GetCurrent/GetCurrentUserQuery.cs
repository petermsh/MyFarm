using MediatR;

namespace Application.Modules.Account.Queries.GetCurrent;

public record GetCurrentUserQuery : IRequest<GetCurrentUserResponse>;