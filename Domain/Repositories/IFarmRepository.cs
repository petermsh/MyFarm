using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Repositories;

public interface IFarmRepository
{
    Task AddAsync(Farm farm, CancellationToken cancellationToken);
    Task<Farm> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Farm>> BrowseAsync(Expression<Func<Farm, bool>> predicate, CancellationToken cancellationToken);
    Task RemoveAsync(Farm farm, CancellationToken cancellationToken);
    Task Update(Farm farm, CancellationToken cancellationToken);
    Task SaveChangesAsync(Farm farm, CancellationToken cancellationToken);
}