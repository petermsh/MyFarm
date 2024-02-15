﻿using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public sealed class User : IdentityUser<Guid>
{
    public ICollection<Farm> Farms { get; set; }
}