import { Message, ShowState } from "../models"
import { store, states} from "../store"

export const message = (options: {title: string, body: string}) => {
    const msg = new Message(options.title, options.body);
    store.messages.push(msg)

    switch (options.title) {
        case "query_data":
            states.data = ShowState.Settings
        case "som_train":
            states.visualization = ShowState.Settings
        case "decision_tree_train":
            states.boundaries = ShowState.Settings
    }
}