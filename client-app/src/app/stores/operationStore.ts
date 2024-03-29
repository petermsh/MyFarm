﻿import {GroupedOperation, Operation} from "../models/operation";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";

export default class OperationStore {

    operationRegistry = new Map<string, Operation>();
    groupedOperationRegistry = new Map<string, GroupedOperation>();
    loadingInitial = false;
    selectedOperation?: Operation = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
        this.clearGroupedOperations = this.clearGroupedOperations.bind(this);
    }

    loadOperations = async (seasonId?: string, fieldId?: string) => {
        this.setLoadingInitial(true);
        try {
            let operations;
            if (seasonId !== undefined && fieldId !== undefined) {
                operations = await agent.Operations.list({ seasonId, fieldId });
            } else if (seasonId !== undefined) {
                operations = await agent.Operations.list({seasonId});
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
    
    loadGroupedOperations = async(fieldId: string) => {
        this.setLoadingInitial(true);
        try {
            let operations;
            operations = await agent.Operations.groupedList(fieldId);
            operations.forEach((operation: GroupedOperation) => {
                this.setGroupedOperation(operation);
            })
            this.setLoadingInitial(false);
        } catch (error) {
             console.log(error);
             this.setLoadingInitial(false);
        }
    }

    createOperation = async (operation: Operation) => {
        this.loading = true;
        try {
            console.log(operation);
            const newOperation = await agent.Operations.create(operation);
            operation.id = newOperation.operationId;
            runInAction(() => {
                this.operationRegistry.set(operation.id, operation);
                this.selectedOperation = operation;
                this.editMode = false;
                this.loading = false;
            })
            return operation.id;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
    
    private setOperation = (operation: Operation) => {
        this.operationRegistry.set(operation.id, operation);
    }
    
    private setGroupedOperation = (operation: GroupedOperation) => {
        this.groupedOperationRegistry.set(operation.seasonName, operation);
    }

    clearGroupedOperations() {
        this.groupedOperationRegistry.clear();
    }
    

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    deleteOperation = async(id: string) => {
        this.loading = true;
        try {
            await agent.Operations.delete(id);
            this.operationRegistry.delete(id);
            runInAction(() => this.loading = false);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}