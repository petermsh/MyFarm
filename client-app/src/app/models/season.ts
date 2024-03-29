﻿
export interface Season {
    id: string,
    name: string,
    earnings?: number,
    expenses?: number,
    status?: string,
    farmId?: string,
}

export interface CreateSeasonResponse {
    seasonId: string
}