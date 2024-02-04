using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public sealed class MyFarmDbContext : DbContext
{
    public MyFarmDbContext(DbContextOptions<MyFarmDbContext> options) : base(options)
    {
    }
    
    public DbSet<Farm> Farms { get; set; }
    public DbSet<Field> Fields { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        base.OnModelCreating(modelBuilder);
    }
}