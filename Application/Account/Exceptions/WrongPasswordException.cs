using Application.Abstractions;

namespace Application.Account.Exceptions;

public class WrongPasswordException : ProjectException
{
    public WrongPasswordException() : base("Wrong password.")
    {
    }
}