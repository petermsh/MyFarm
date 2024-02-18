export interface Field {
    id: string,
    location: string,
    area: number,
    number: number,
    farmId?: string,
}

export interface CreateFieldResponse {
    fieldId: string
}