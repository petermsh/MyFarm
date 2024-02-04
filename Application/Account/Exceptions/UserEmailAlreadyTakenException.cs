using Application.Abstractions;

namespace Application.Account.Exceptions;

public class UserEmailAlreadyTakenException : ProjectException
{
    public UserEmailAlreadyTakenException(string email) : base($"Account with email address: {email} exists.") { }
}