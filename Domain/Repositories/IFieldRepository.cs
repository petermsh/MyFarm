using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Repositories;

public interface IFieldRepository
{
    Task AddAsync(Field field, CancellationToken cancellationToken);
    Task<Field> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Field>> BrowseAsync(Expression<Func<Field, bool>> predicate, CancellationToken cancellationToken);
    Task RemoveAsync(Field field, CancellationToken cancellationToken);
    Task Update(Field field, CancellationToken cancellationToken);
    Task SaveChangesAsync(Field field, CancellationToken cancellationToken);
}