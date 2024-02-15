using Application.Abstractions;

namespace Application.Modules.Account.Exceptions;

public class RegistrationFailedException : ProjectException
{
    public RegistrationFailedException(string errors) : base(errors)
    {
        
    }
}