using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Repositories;

public interface ISeasonRepository
{
    Task AddAsync(Season season, CancellationToken cancellationToken);
    Task<Season> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Season>> BrowseAsync(Expression<Func<Season, bool>> predicate, CancellationToken cancellationToken);
    Task RemoveAsync(Season season, CancellationToken cancellationToken);
    Task Update(Season season, CancellationToken cancellationToken);
    Task SaveChangesAsync(Season season, CancellationToken cancellationToken);
}