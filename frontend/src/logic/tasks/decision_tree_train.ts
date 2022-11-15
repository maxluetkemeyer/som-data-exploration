import { ShowState } from "../models"
import { states, store } from "../store"

export const decision_tree_train = (output: any) => {
    store.boundaries = output
    states.boundaries = ShowState.Output
}