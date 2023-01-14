import json
from minisom import MiniSom
import storage
import numpy as np
from sklearn.preprocessing import MinMaxScaler


async def som_train(websocket, options):
    # Print colored Task name
    storage.printTask("som_train")

    # Extract the initialization settings
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

    # Get data from storage, standardize and transform it to 2d array
    data = storage.data.copy()
    data = (data - np.mean(data, axis=0)) / np.std(data, axis=0)
    array = data.values

    # Create a MiniSom instance
    som = MiniSom(x=neurons_x, y=neurons_y,
                  input_len=array.shape[1], sigma=sigma, learning_rate=learning_rate, neighborhood_function=neighborhood_function, random_seed=random_seed, topology=topology, activation_distance=activation_distance,)

    # Initialize the weights with the two largest principal components
    som.pca_weights_init(array)

    # Train the weights of the SOM
    som.train(data=array, num_iteration=num_iteration,
              random_order=random_order, verbose=True)

    # Get the win map, change representation and store it in the storage
    win_map_dict = som.win_map(array, return_indices=True)
    win_map = process_win_map(win_map_dict)
    storage.som = {
        "win_map": win_map_dict,
    }

    # Get the weights and change representation
    W = som.get_weights()
    weights = process_weights(W)

    # If the topology is "rectangular", calculate the topographic error
    topographic_error = -1
    if topology == "rectangular":
        topographic_error = som.topographic_error(data=array)

    # Response with all the data including also the distance map and the quantization error
    response = {
        "task": "som_train",
        "som": {
            "distance_map": som.distance_map().tolist(),
            "win_map": win_map,
            "weights": weights,
            "quantization_error": som.quantization_error(data=array),
            "topographic_error": topographic_error
        }
    }

    # Send resposne
    await websocket.send(json.dumps(response, cls=NpEncoder))


def process_win_map(win_map_dict):
    """ Change the win map representation with touples to a more organized one
    """
    win_map = []
    for key in win_map_dict:
        win_map.append({
            "coordinates": list(key),  # tested: y, x
            "indices": win_map_dict[key],
        })
    return win_map


def process_weights(W):
    """ Normalizes all weights to the range [0,1[
    """
    min_max_scaler = MinMaxScaler()
    weights_list = []

    for i in range(len(W[0][0])):
        w = W[:, :, i]
        scaled = min_max_scaler.fit_transform(w)
        weights_list.append(scaled)

    return weights_list


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)
