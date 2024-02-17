import CommonStore from "./commonStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStores";
import FarmStore from "./farmStore";
import SeasonStore from "./seasonStore";
import FieldStore from "./fieldStore";


interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    farmStore : FarmStore;
    seasonStore: SeasonStore;
    fieldStore: FieldStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    farmStore: new FarmStore(),
    seasonStore: new SeasonStore(),
    fieldStore: new FieldStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}