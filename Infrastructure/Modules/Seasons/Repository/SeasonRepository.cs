using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Seasons.Repository;

internal sealed class SeasonRepository : ISeasonRepository
{
    private readonly MyFarmDbContext _dbContext;

    public SeasonRepository(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Season season, CancellationToken cancellationToken)
    {
        await _dbContext.Seasons.AddAsync(season, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Season> GetAsync(Guid id, CancellationToken cancellationToken)
        => await _dbContext.Seasons
            .Where(f => f.Id == id)
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<List<Season>> BrowseAsync(Expression<Func<Season, bool>> predicate, CancellationToken cancellationToken)
        => await _dbContext.Seasons
            .Where(predicate)
            .ToListAsync(cancellationToken);

    public async Task RemoveAsync(Season season, CancellationToken cancellationToken)
    {
        _dbContext.Seasons.Remove(season);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(Season season, CancellationToken cancellationToken)
    {
        _dbContext.Seasons.Update(season);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(Season season, CancellationToken cancellationToken)
        => await _dbContext.SaveChangesAsync(cancellationToken);
}