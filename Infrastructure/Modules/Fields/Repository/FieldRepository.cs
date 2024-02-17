using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Fields.Repository;

public class FieldRepository : IFieldRepository
{
    private readonly MyFarmDbContext _dbContext;

    public FieldRepository(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Field field, CancellationToken cancellationToken)
    {
        await _dbContext.Fields.AddAsync(field, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Field> GetAsync(Guid id, CancellationToken cancellationToken)
        => await _dbContext.Fields
            .Where(f => f.Id == id)
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<List<Field>> BrowseAsync(Expression<Func<Field, bool>> predicate, CancellationToken cancellationToken)
        => await _dbContext.Fields
            .Where(predicate)
            .ToListAsync(cancellationToken);

    public async Task RemoveAsync(Field field, CancellationToken cancellationToken)
    {
        _dbContext.Fields.Remove(field);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(Field field, CancellationToken cancellationToken)
    {
        _dbContext.Fields.Update(field);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(Field field, CancellationToken cancellationToken)
        => await _dbContext.SaveChangesAsync(cancellationToken);
}