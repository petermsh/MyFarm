﻿using Application.Interfaces;
using Application.Modules.Account.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Modules.Account.Commands.SignIn;

public class SignInHandler : IRequestHandler<SignInCommand, SignInResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public SignInHandler(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<SignInResponse> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user is null)
            throw new UserNotFoundException();
        
        var result = await _userManager.CheckPasswordAsync(user, request.Password);

        if (!result)
            throw new WrongPasswordException();

        return new SignInResponse
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }
}