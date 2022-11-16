import { store } from "../store"
import { connection } from "../websocket";

export const database_connect = (tables: []) => {
    store.tables = tables;
    store.connected = true;
}

export const database_connect_send = () => {
    const msg = {
        type: "database_connect",
        options: store.database
    }

    connection.send(JSON.stringify(msg))
}