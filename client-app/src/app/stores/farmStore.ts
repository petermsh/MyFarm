import {Farm} from "../models/farm";
import {makeAutoObservable} from "mobx";
import agent from "../api/agent";

export default class FarmStore {

    farmRegistry = new Map<string, Farm>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);

    }

    loadFarms = async () => {
        this.setLoadingInitial(true);
        try {
            const farms = await agent.Farms.list();
            //console.log(farms);
            farms.forEach((farm: Farm) => {
                this.setFarm(farm);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    private setFarm = (farm: Farm) => {
        this.farmRegistry.set(farm.id, farm);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}