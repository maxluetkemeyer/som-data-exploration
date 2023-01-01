import { Message, ShowState } from "../models"
import { store, states} from "../store"

let lastId = 0

export const message = (options: {title: string, body: string}) => {
    
    createMessage(options.title, options.body)

    switch (options.title) {
        case "query_data":
            states.data = ShowState.Settings
            break
        case "som_train":
            states.visualization = ShowState.Settings
            break
        case "boundaries_train":
            states.boundaries = ShowState.Output
            break
        case "som_mapsize":
            states.visualization = ShowState.Settings
            break
    }
}

export const createMessage = (title: string, body: any) => {
    lastId++;
    const msg = new Message(lastId, title, body);
    store.messages.push(msg)
}