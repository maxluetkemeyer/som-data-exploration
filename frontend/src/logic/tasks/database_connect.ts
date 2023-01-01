import { store } from "../store"
import { connection } from "../websocket";

export const database_connect = (tables: []) => {
    store.tables = tables;
    store.connected = true;
}

export const database_connect_send = () => {
    const msg = {
        task: "database_connect",
        credentials: store.database
    }

    connection.send(JSON.stringify(msg))
}