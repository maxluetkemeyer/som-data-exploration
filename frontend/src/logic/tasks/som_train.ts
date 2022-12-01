import { ShowState } from "../models";
import { states, store } from "../store"
import { connection } from "../websocket";

export const som_train = (som: any) => {
    store.som.result = som;
    states.visualization = ShowState.Output;
}

export const som_train_send = () => {
    states.visualization = ShowState.Loading;

    store.som.selection = []

    const msg = {
        type: "som_train",
        options: store.som.settings,
    }

    connection.send(JSON.stringify(msg))
}