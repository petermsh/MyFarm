﻿using Application.Modules.Operations.Queries.BrowseOperations;
using Domain.Enums;

namespace Application.Modules.Seasons.Queries.GetSeason;

public class GetSeasonResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Status { get; set; }
    public float Earnings { get; set; }
    public float Expenses { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}