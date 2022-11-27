import json
import storage
from sklearn import tree

from tasks.decision_tree.predicate import DecisionTreeQBE


async def decision_tree_train(websocket, options):
    print("decision_tree_train task")

    selection = options["selection"]
    target_list = create_decision_tree_dataset(selection=selection)

    dtqbe = DecisionTreeQBE(storage.data, target_list)
    output = dtqbe.search_best_predicate()

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
        key = (i["x"], i["y"])

        target_indices_set.update(win_map[key])

    decision_tree_targets = []
    for i in range(len(storage.data)):
        if i in target_indices_set:
            decision_tree_targets.append(1)
        else:
            decision_tree_targets.append(0)

    # data_dt = storage.data.assign(dtTarget=decision_tree_targets)

    return decision_tree_targets
