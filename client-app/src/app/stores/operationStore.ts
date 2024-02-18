import {Operation} from "../models/operation";
import {makeAutoObservable} from "mobx";
import agent from "../api/agent";

export default class OperationStore {

    operationRegistry = new Map<string, Operation>();
    loadingInitial = false;
    selectedOperation?: Operation = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadOperations = async (seasonId?: string) => {
        this.setLoadingInitial(true);
        try {
            let operations;
            if (seasonId !== undefined) {
                operations = await agent.Operations.list({ seasonId });
            } else {
                operations = await agent.Operations.list();
            }
            operations.forEach((operation: Operation) => {
                this.setOperation(operation);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private setOperation = (operation: Operation) => {
        this.operationRegistry.set(operation.id, operation);
    }
    

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}