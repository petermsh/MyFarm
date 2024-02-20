
export interface Farm {
    id: string;
    address: string;
    name: string;
}

export interface CreateFarmResponse {
    farmId: string
}

export interface FarmListResponse {
    id: string;
    address: string;
    name: string;
    totalArea: number;
}