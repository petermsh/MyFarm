import {Field} from "../models/field";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";


export default class FieldStore {

    fieldRegistry = new Map<string, Field>();
    loadingInitial = false;
    selectedField?: Field = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);

    }

    loadFields = async (farmId?: string) => {
        this.setLoadingInitial(true);
        try {
            let fields;
            if(farmId !== undefined) {
                fields = await agent.Fields.list( { farmId } );
            } else {
                fields = await agent.Fields.list();
            }
            fields.forEach((field: Field) => {
                this.setField(field);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadField = async (id:string) => {
        let field = this.getField(id);
        if (field) {
            this.selectedField = field;
            return field;
        } else {
            this.setLoadingInitial(true);
            try {
                const field = await agent.Fields.details(id);
                this.setField(field);
                runInAction(() => this.selectedField = field);
                this.setLoadingInitial(false);
                return field;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createField = async (field: Field) => {
        this.loading = true;
        try {
            const newField = await agent.Fields.create(field);
            field.id = newField.fieldId;
            runInAction(() => {
                this.fieldRegistry.set(field.id, field);
                this.selectedField = field;
                this.editMode = false;
                this.loading = false;
            })
            return field.id;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateField = async (field: Field) => {
        this.loading = true;
        try {
            await agent.Fields.update(field);
            runInAction(() => {
                this.fieldRegistry.set(field.id, field);
                this.selectedField = field;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    private setField = (field: Field) => {
        this.fieldRegistry.set(field.id, field);
    }

    private getField = (id:string) => {
        return this.fieldRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}