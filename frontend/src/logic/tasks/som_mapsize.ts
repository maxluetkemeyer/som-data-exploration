import { ShowState } from "../models";
import { states, store } from "../store";
import { connection } from "../websocket";

export const som_mapsize = (mapsize: {y: number, x: number}) => {
    states.visualization = ShowState.Settings;

    store.som.settings.neurons.y = mapsize.y;
    store.som.settings.neurons.x = mapsize.x;
}

export const som_mapsize_send = () => {
    states.visualization = ShowState.Loading;

    const msg = {
        task:"som_mapsize",
        lattice: store.som.settings.topology,
    }

    connection.send(JSON.stringify(msg))
}