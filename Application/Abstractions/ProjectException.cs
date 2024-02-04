namespace Application.Abstractions;

public abstract class ProjectException : Exception
{
    protected ProjectException(string message) : base(message) { }
}