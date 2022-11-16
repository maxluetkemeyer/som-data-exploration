import { store } from "../store"
import { connection } from "../websocket"

export const query_data = (data: []) => {
    store.data = data
}

export const query_data_send = () => {
    const msg = {
        type: "query_data",
        query: store.query,
    }

    connection.send(JSON.stringify(msg))
}