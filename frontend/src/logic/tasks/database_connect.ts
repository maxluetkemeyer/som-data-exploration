import { store } from "../store"

export const database_connect = (tables: []) => {
    store.tables = tables;
    store.connected = true;
}