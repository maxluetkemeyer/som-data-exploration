import json
from minisom import MiniSom
import storage
import numpy as np
from sklearn.preprocessing import normalize, MinMaxScaler


async def som_train(websocket, options):
    storage.printTask("som_train")

    neurons_x = options["neurons"]["x"]
    neurons_y = options["neurons"]["y"]
    sigma = options["sigma"]
    learning_rate = options["learning_rate"]
    random_seed = options["random_seed"]
    neighborhood_function = options["neighborhood"]
    topology = options["topology"]
    activation_distance = options["activation_distance"]
    # decay_function = options["decay_function"]
    num_iteration = options["num_iterations"]
    random_order = options["random_order"]

    print(neurons_x)

    data = storage.data.copy()
    data = (data - np.mean(data, axis=0)) / np.std(data, axis=0)
    array = data.values

    print(len(array))

    # x and y swapped???
    som = MiniSom(x=neurons_x, y=neurons_y,
                  input_len=array.shape[1], sigma=sigma, learning_rate=learning_rate, neighborhood_function=neighborhood_function, random_seed=random_seed, topology=topology, activation_distance=activation_distance,)

    som.pca_weights_init(array)

    som.train(data=array, num_iteration=num_iteration,
              random_order=random_order, verbose=True)

    win_map_dict = som.win_map(array, return_indices=True)
    win_map = []
    for key in win_map_dict:
        win_map.append({
            "coordinates": list(key),  # tested: y, x
            "indices": win_map_dict[key],
        })

    storage.som = {
        "win_map": win_map_dict,
    }

    min_max_scaler = MinMaxScaler()

    weights_list = []
    W = som.get_weights()
    for i in range(len(W[0][0])):
        w = W[:, :, i]

        # normalized_w = normalize(w, axis=1)
        scaled = min_max_scaler.fit_transform(w)

        weights_list.append(scaled)

    topographic_error = -1
    if topology == "rectangular":
        topographic_error = som.topographic_error(data=array)

    response = {
        "task": "som_train",
        "som": {
            "distance_map": som.distance_map().tolist(),
            "win_map": win_map,
            "weights": weights_list,
            "quantization_error": som.quantization_error(data=array),
            "topographic_error": topographic_error
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
