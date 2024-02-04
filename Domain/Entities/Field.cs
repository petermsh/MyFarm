﻿namespace Domain.Entities;

public class Field : BaseEntity
{
    public string Location { get; set; }
    
    public float Area { get; set; }
    
    public Guid FarmId { get; set; }
    public Farm Farm { get; set; }
}