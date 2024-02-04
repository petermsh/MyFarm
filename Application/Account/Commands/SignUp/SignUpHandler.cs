using Application.Account.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Account.Commands.SignUp;

public class SignUpHandler : IRequestHandler<SignUpCommand, SignUpResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public SignUpHandler(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }


    public async Task<SignUpResponse> Handle(SignUpCommand request, CancellationToken cancellationToken)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == request.Email, cancellationToken))
            throw new UserEmailAlreadyTakenException(request.Email);

        var user = new User
        {
            UserName = request.Username,
            Email = request.Email
        };
        
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(" ", result.Errors.Select(x => x.Description).ToList());
            throw new RegistrationFailedException(errors);
        }
        
        return new SignUpResponse
        {
            Username = request.Username,
            Token = _tokenService.CreateToken(user)
        };
    }
}