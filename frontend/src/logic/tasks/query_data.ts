import { ShowState } from "../models"
import { store, states } from "../store"
import { connection } from "../websocket"

export const query_data = (data: []) => {
    store.data = data
    states.data = ShowState.Output
}

export const query_data_send = () => {
    states.data = ShowState.Loading

    const msg = {
        type: "query_data",
        query: store.query,
    }

    connection.send(JSON.stringify(msg))
}