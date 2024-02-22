using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Plants.Repository;

public class PlantRepository : IPlantRepository
{
    private readonly MyFarmDbContext _dbContext;

    public PlantRepository(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Plant plant, CancellationToken cancellationToken)
    {
        await _dbContext.Plants.AddAsync(plant, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Plant> GetAsync(Guid id, CancellationToken cancellationToken)
        => await _dbContext.Plants
            .Where(f => f.Id == id)
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<List<Plant>> BrowseAsync(Expression<Func<Plant, bool>> predicate, CancellationToken cancellationToken)
        => await _dbContext.Plants
            .Where(predicate)
            .ToListAsync(cancellationToken);

    public async Task RemoveAsync(Plant plant, CancellationToken cancellationToken)
    {
        _dbContext.Plants.Remove(plant);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(Plant plant, CancellationToken cancellationToken)
    {
        _dbContext.Plants.Update(plant);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(Plant plant, CancellationToken cancellationToken)
        => await _dbContext.SaveChangesAsync(cancellationToken);
}