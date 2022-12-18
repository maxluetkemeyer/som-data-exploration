import json
import os 
import storage

from tasks.decision_tree.predicate import DecisionTreeQBE


async def decision_tree_train(websocket, options):
    storage.printTask("decision_tree_train")

    selection = options["selection"]
    target_list = create_decision_tree_dataset(selection=selection)

    dtqbe = DecisionTreeQBE(storage.data, target_list)
    output = dtqbe.search_best_predicate()

    
    dir_path = os.path.dirname(os.path.realpath(__file__))
    path = os.path.join(dir_path, "../../frontend/dist/assets/tree.svg")
    dtqbe.saveTreePlot(path)

    print("finished decision tree")

    response = {
        "type": "decision_tree_train",
        "output": output
    }

    await websocket.send(json.dumps(response))


def create_decision_tree_dataset(selection):
    win_map = storage.som["win_map"]
    target_indices_set = set()

    for i in selection:
        key = (i["y"], i["x"])  # x, y or y, x
        target_indices_set.update(win_map[key])

    decision_tree_targets = []
    for i in range(len(storage.data)):
        if i in target_indices_set:
            decision_tree_targets.append(1)
        else:
            decision_tree_targets.append(0)

    # [0, 0, 0, 1, 1, 0, 0]

    # data_dt = storage.data.assign(dtTarget=decision_tree_targets)

    return decision_tree_targets
