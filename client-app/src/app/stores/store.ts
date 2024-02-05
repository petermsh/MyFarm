import CommonStore from "./commonStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStores";


interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}