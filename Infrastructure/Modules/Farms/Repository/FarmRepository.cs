using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Farms.Repository;

internal sealed class FarmRepository : IFarmRepository
{
    private readonly MyFarmDbContext _dbContext;

    public FarmRepository(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task AddAsync(Farm farm, CancellationToken cancellationToken)
    {
        await _dbContext.Farms.AddAsync(farm, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Farm> GetAsync(Guid id, CancellationToken cancellationToken)
        => await _dbContext.Farms
            .Where(f => f.Id == id)
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<List<Farm>> BrowseAsync(Expression<Func<Farm, bool>> predicate, CancellationToken cancellationToken)
        => await _dbContext.Farms
            .Where(predicate)
            .ToListAsync(cancellationToken);

    public async Task RemoveAsync(Farm farm, CancellationToken cancellationToken)
    {
        _dbContext.Farms.Remove(farm);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(Farm farm, CancellationToken cancellationToken)
    {
        _dbContext.Farms.Update(farm);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(Farm farm, CancellationToken cancellationToken)
        => await _dbContext.SaveChangesAsync(cancellationToken);
}