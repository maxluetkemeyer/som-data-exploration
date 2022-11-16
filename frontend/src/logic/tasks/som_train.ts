import { ShowState } from "../models";
import { states, store } from "../store"
import { connection } from "../websocket";

export const som_train = (som: any) => {
    store.som = som;
    states.visualization = ShowState.Output;
}

export const som_train_send = () => {
    states.visualization = ShowState.Loading;

    const msg = {
        type:"som_train",
        options: ""
    }

    connection.send(JSON.stringify(msg))
}