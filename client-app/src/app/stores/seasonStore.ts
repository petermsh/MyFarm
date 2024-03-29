﻿import {Season} from "../models/season";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";


export default class SeasonStore {

    seasonRegistry = new Map<string, Season>();
    loadingInitial = false;
    selectedSeason?: Season = undefined;
    editMode = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadSeasons = async (farmId?: string) => {
        this.setLoadingInitial(true);
        try {
            let seasons;
            if(farmId !== undefined) {
                seasons = await agent.Seasons.list( { farmId } );
            } else {
                seasons = await agent.Seasons.list();
            }
            seasons.forEach((season: Season) => {
                this.setSeason(season);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadSeason = async (id:string) => {
        let season = this.getSeason(id);
        if (season) {
            this.selectedSeason = season;
            return season;
        } else {
            this.setLoadingInitial(true);
            try {
                const season = await agent.Seasons.details(id);
                this.setSeason(season);
                runInAction(() => this.selectedSeason = season);
                this.setLoadingInitial(false);
                return season;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createSeason = async (season: Season) => {
        this.loading = true;
        try {
            const newSeason = await agent.Seasons.create(season);
            console.log(newSeason);
            season.id = newSeason.seasonId;
            runInAction(() => {
                this.seasonRegistry.set(season.id, season);
                this.selectedSeason = season;
                this.editMode = false;
                this.loading = false;
            })
            return season.id;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateSeason = async (season: Season) => {
        this.loading = true;
        try {
            await agent.Seasons.update(season);
            runInAction(() => {
                this.seasonRegistry.set(season.id, season);
                this.selectedSeason = season;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteSeason = async(id: string) => {
        this.loading = true;
        try {
            await agent.Seasons.delete(id);
            this.seasonRegistry.delete(id);
            runInAction(() => this.loading = false);
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    private setSeason = (season: Season) => {
        this.seasonRegistry.set(season.id, season);
    }

    private getSeason = (id:string) => {
        return this.seasonRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
}