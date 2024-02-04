using System.Security.Claims;
using Application.Account.Exceptions;
using Application.Account.Queries.GetCurrent;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Accounts.Queries;

public class GetCurrentUserHandler : IRequestHandler<GetCurrentUserQuery, GetCurrentUserResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly IUserAccessor _userAccessor;

    public GetCurrentUserHandler(UserManager<User> userManager, IUserAccessor userAccessor)
    {
        _userManager = userManager;
        _userAccessor = userAccessor;
    }
    
    public async Task<GetCurrentUserResponse> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.Email == _userAccessor.GetUserEmail(), cancellationToken);
        
        if (user is null)
            throw new UserNotFoundException();

        return new GetCurrentUserResponse
        {
            Id = user.Id,
            Username = user.UserName
        };
    }
}