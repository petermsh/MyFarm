using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class PlantConfiguration : IEntityTypeConfiguration<Plant>
{
    public void Configure(EntityTypeBuilder<Plant> builder)
    {
        builder.HasKey(s => s.Id);
        
        builder
            .HasOne(x => x.Season)
            .WithMany(x => x.Plants)
            .HasForeignKey(x=>x.SeasonId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder
            .HasOne(x => x.Field)
            .WithMany(x => x.Plants)
            .HasForeignKey(x=>x.FieldId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}