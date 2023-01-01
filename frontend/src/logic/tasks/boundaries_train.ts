import { ShowState } from "../models"
import { states, store } from "../store"
import { connection } from "../websocket"

export const boundaries_train = (output: any) => {
    store.boundaries = output
    states.boundaries = ShowState.Output

    console.log(store.boundaries)
}

export const boundaries_train_send = async () => {
    states.boundaries = ShowState.Loading;

    const msg = {
        task: "boundaries_train",
        selection: store.som.selection
    }

    connection.send(JSON.stringify(msg))

    console.log(store.som.selection)
}