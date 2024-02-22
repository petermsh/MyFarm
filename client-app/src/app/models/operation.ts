
export interface Operation {
    id: string,
    name: string,
    operationType: string,
    value: number,
    seasonId?: string,
    fieldId?: string,
    fieldNumber?: number,
    date: Date | null
}


export class Operation implements Operation {
    constructor(init: Operation) {
        this.id = init.id;
        this.name = init.name;
        this.operationType = init.operationType;
        this.value = init.value;
        this.date = init.date;
    }

    id: string;
    name: string;
    operationType: string;
    value: number;
    date: Date | null;
}

export interface CreateOperationResponse {
    operationId: string
}