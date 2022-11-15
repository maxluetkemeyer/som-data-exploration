import { Message } from "../models"
import { store } from "../store"

export const message = (options: {title: string, body: string}) => {
    const msg = new Message(options.title, options.body);
    store.messages = [];
    const t = [msg];
    store.messages.push(msg)
}