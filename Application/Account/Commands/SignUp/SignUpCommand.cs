using MediatR;

namespace Application.Account.Commands.SignUp;

public record SignUpCommand(string Username, string Password, string Email)
    : IRequest<SignUpResponse>;