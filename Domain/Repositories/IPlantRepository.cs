using System.Linq.Expressions;
using Domain.Entities;

namespace Domain.Repositories;

public interface IPlantRepository
{
    Task AddAsync(Plant plant, CancellationToken cancellationToken);
    Task<Plant> GetAsync(Guid id, CancellationToken cancellationToken);
    Task<List<Plant>> BrowseAsync(Expression<Func<Plant, bool>> predicate, CancellationToken cancellationToken);
    Task RemoveAsync(Plant plant, CancellationToken cancellationToken);
    Task Update(Plant plant, CancellationToken cancellationToken);
    Task SaveChangesAsync(Plant plant, CancellationToken cancellationToken);
}