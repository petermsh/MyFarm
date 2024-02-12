import {Farm} from "../models/farm";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";

export default class FarmStore {

    farmRegistry = new Map<string, Farm>();
    loadingInitial = false;
    selectedFarm?: Farm = undefined;

    constructor() {
        makeAutoObservable(this);

    }

    loadFarms = async () => {
        this.setLoadingInitial(true);
        try {
            const farms = await agent.Farms.list();
            farms.forEach((farm: Farm) => {
                this.setFarm(farm);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadFarm = async (id:string) => {
        let farm = this.getFarm(id);
        if (farm) {
            this.selectedFarm = farm;
            return farm;
        } else {
            this.setLoadingInitial(true);
            try {
                const farm = await agent.Farms.details(id);
                this.setFarm(farm);
                runInAction(() => this.selectedFarm = farm);
                this.setLoadingInitial(false);
                return farm;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    
    private setFarm = (farm: Farm) => {
        this.farmRegistry.set(farm.id, farm);
    }
    
    private getFarm = (id:string) => {
        return this.farmRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}