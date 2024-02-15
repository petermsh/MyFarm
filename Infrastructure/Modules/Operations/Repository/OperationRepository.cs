using System.Linq.Expressions;
using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Modules.Operations.Repository;

public class OperationRepository : IOperationRepository
{
    private readonly MyFarmDbContext _dbContext;

    public OperationRepository(MyFarmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Operation operation, CancellationToken cancellationToken)
    {
        await _dbContext.Operations.AddAsync(operation, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Operation> GetAsync(Guid id, CancellationToken cancellationToken)
        => await _dbContext.Operations
            .Where(f => f.Id == id)
            .SingleOrDefaultAsync(cancellationToken);

    public async Task<List<Operation>> BrowseAsync(Expression<Func<Operation, bool>> predicate, CancellationToken cancellationToken)
        => await _dbContext.Operations
            .Where(predicate)
            .ToListAsync(cancellationToken);

    public async Task RemoveAsync(Operation operation, CancellationToken cancellationToken)
    {
        _dbContext.Operations.Remove(operation);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(Operation operation, CancellationToken cancellationToken)
    {
        _dbContext.Operations.Update(operation);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task SaveChangesAsync(Operation operation, CancellationToken cancellationToken)
        => await _dbContext.SaveChangesAsync(cancellationToken);
}