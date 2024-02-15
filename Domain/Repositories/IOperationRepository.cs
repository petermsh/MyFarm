using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Repositories;

public interface IOperationRepository
{
    Task AddAsync(Operation operation, CancellationToken cancellationToken);
    Task<Operation> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Operation>> BrowseAsync(Expression<Func<Operation, bool>> predicate, CancellationToken cancellationToken);
    Task RemoveAsync(Operation operation, CancellationToken cancellationToken);
    Task Update(Operation operation, CancellationToken cancellationToken);
    Task SaveChangesAsync(Operation operation, CancellationToken cancellationToken);
}