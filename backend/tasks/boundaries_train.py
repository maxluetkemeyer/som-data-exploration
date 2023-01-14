import json
import os
import storage
import numpy as np
from tasks.decision_tree.predicate import DecisionTreeQBE


async def boundaries_train(websocket, selection):
    # Print colored task name
    storage.printTask("boundaries_train")

    # Calculate a list with zeros and ones indicating the targets
    target_list = create_target_list(selection=selection)

    # Create a DecisionTreeClassifier and search for the best predicate
    dtqbe = DecisionTreeQBE(storage.data, target_list)
    output = dtqbe.search_best_predicate()

    # Save the plot of the tree in the dist folder of the frontend
    dir_path = os.path.dirname(os.path.realpath(__file__))
    path = os.path.join(dir_path, "../../frontend/dist/assets/tree.svg")
    dtqbe.saveTreePlot(path)

    # Response with output string attached
    response = {
        "task": "boundaries_train",
        "output": output
    }

    # Send resposne
    await websocket.send(json.dumps(response))


def create_target_list(selection):
    """ Creates a list with zeros and ones, whether the
        index of the dataset is targeted or not.
        e.g. [0, 0, 0, 1, 1, 0, 0]
    """
    # Get win map from storage
    win_map = storage.som["win_map"]

    # Create a set with all indices of all selected neurons
    target_indices_set = set()
    for neuron in selection:
        # Create the key in the way how MiniSOM stores the win map
        key = (neuron["y"], neuron["x"])

        # Get a list of all indices of this neuron
        indices = win_map[key]

        # Add the indices to the set
        target_indices_set.update(indices)

    # Create the desired output list with zeros and then
    # set every desired index to one
    decision_tree_targets = np.zeros(shape=len(storage.data), dtype=int)
    for idx in target_indices_set:
        decision_tree_targets[idx] = 1

    return decision_tree_targets
