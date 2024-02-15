using Application.Abstractions;

namespace Application.Modules.Account.Exceptions;

public class UserNotFoundException : ProjectException
{
    public UserNotFoundException() : base("User not found.")
    {
    }
}