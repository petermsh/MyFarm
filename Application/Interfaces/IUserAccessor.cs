namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserIdAsString();
    Guid GetUserIdAsGuid();
    string GetUserEmail();
}