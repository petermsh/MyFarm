using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

internal sealed class OperationConfiguration : IEntityTypeConfiguration<Operation>
{
    public void Configure(EntityTypeBuilder<Operation> builder)
    {
        builder.HasKey(o => o.Id);
        builder.Property(o => o.Value).IsRequired().HasPrecision(12, 2);
        builder.Property(o => o.OperationType).IsRequired();
        builder.Property(o => o.Name).IsRequired();
        
        builder
            .HasOne(x => x.Season)
            .WithMany(x => x.Operations)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
