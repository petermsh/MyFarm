using MediatR;

namespace Application.Account.Commands.SignIn;

public class SignInCommand : IRequest<SignInResponse>
{
    public string Login { get; set; }
    public string Password { get; set; }
}