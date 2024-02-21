import CommonStore from "./commonStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStores";
import FarmStore from "./farmStore";
import SeasonStore from "./seasonStore";
import FieldStore from "./fieldStore";
import OperationStore from "./operationStore";


interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    farmStore : FarmStore;
    seasonStore: SeasonStore;
    fieldStore: FieldStore;
    operationStore: OperationStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    farmStore: new FarmStore(),
    seasonStore: new SeasonStore(),
    fieldStore: new FieldStore(),
    operationStore: new OperationStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}