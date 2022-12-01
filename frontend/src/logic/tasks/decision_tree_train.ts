import { ShowState } from "../models"
import { states, store } from "../store"
import { connection } from "../websocket"

export const decision_tree_train = (output: any) => {
    store.boundaries = output
    states.boundaries = ShowState.Output
}

export const decision_tree_train_send = async () => {
    states.boundaries = ShowState.Loading;

    const msg = {
        type:"decision_tree_train",
        options: {
            selection: store.som.selection
        }
    }

    connection.send(JSON.stringify(msg))
}