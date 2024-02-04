using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public sealed class MyFarmDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public MyFarmDbContext(DbContextOptions options) : base(options)
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