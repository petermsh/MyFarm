using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

internal sealed class SeasonConfiguration : IEntityTypeConfiguration<Season>
{
    public void Configure(EntityTypeBuilder<Season> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder
            .HasMany(x => x.Operations)
            .WithOne(x => x.Season)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder
            .HasOne(x => x.Farm)
            .WithMany(x => x.Seasons)
            .HasForeignKey(x=>x.FarmId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}