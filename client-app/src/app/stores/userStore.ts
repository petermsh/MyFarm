﻿import {makeAutoObservable, runInAction} from "mobx";
import {User, UserFormValues} from "../models/user";
import agent from "../api/agent";
import {store} from "./store";
import {router} from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }
    
    login = async(creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        console.log(user);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        await router.navigate('/farms');
        store.modalStore.closeModal();
    }

    register = async(creds: UserFormValues) => {
        const user = await agent.Account.register(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        await router.navigate('/farms');
        store.modalStore.closeModal();
    }


    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        const user = await agent.Account.current();
        runInAction(() => this.user = user);
    }
}