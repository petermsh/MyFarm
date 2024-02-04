using Application.Abstractions;

namespace Application.Account.Exceptions;

public class RegistrationFailedException : ProjectException
{
    public RegistrationFailedException(string errors) : base(errors)
    {
        
    }
}