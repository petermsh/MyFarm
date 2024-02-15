using Application.Abstractions;

namespace Application.Modules.Seasons.Exceptions;

public class CannotAddSeasonToFarmException : ProjectException
{
    public CannotAddSeasonToFarmException() : base("Cannot add season to farm.")
    {
    }
}