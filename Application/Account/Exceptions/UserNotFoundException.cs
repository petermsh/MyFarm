using Application.Abstractions;

namespace Application.Account.Exceptions;

public class UserNotFoundException : ProjectException
{
    public UserNotFoundException() : base("User not found.")
    {
    }
}