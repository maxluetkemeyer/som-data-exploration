import { store } from "../store"

export const query_data = (data: []) => {
    store.data = data
}