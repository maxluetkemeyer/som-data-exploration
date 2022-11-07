import { store } from "../store"

export const som_train = (som: any) => {
    store.som = som;
    store.somDataAvailable = true;
}