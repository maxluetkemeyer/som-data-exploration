import json
from minisom import MiniSom
import storage
import numpy as np


async def som_train(websocket, options):
    print("som_train task")

    data = storage.data.copy()

    data = (data - np.mean(data, axis=0)) / np.std(data, axis=0)

    array = data.values

    n_neurons = 20
    m_neurons = 20

    som = MiniSom(n_neurons, m_neurons, array.shape[1], sigma=1.5, learning_rate=.5, neighborhood_function='gaussian', random_seed=0)

    som.pca_weights_init(array)

    som.train(array, 4000, verbose=True)

    win_map_dict = som.win_map(array, return_indices=True)
    win_map = []
    for key in win_map_dict:
        win_map.append({
            "coordinates": list(key),
            "indices": win_map_dict[key],
        })

    response = {
        "type": "som_train",
        "som": {
            "distance_map": som.distance_map().tolist(),
            "win_map": win_map,
            "weights": som.get_weights().tolist(),
        }
    }

    await websocket.send(json.dumps(response, cls=NpEncoder))


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)
