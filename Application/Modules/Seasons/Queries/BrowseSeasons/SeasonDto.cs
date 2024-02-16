﻿using Domain.Enums;

namespace Application.Modules.Seasons.Queries.BrowseSeasons;

public class SeasonDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
}