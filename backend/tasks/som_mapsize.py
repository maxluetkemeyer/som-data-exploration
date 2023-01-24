import json
import numpy as np
import storage


async def som_mapsize(websocket, lattice):
    """
    Calculates the optimal map size for the given lattice.
    :lattice: 'rectangular' or 'hexagonal'
    """
    # Print colored Task name
    storage.printTask("som_mapsize")

    # Create matrix of the data Dataframe
    dataArray = storage.data.values

    # Calculate map size
    map_size = calculate_map_size(dataArray, lattice)

    # Response with map size attached
    response = {
        "task": "som_mapsize",
        "map_size": map_size
    }

    # Send response
    await websocket.send(json.dumps(response))


def calculate_map_size(data, lattice):
    """
    Calculates the optimal map size given a dataset using eigenvalues and
    eigenvectors.
    Inspired by https://github.com/sevamoo/SOMPY/blob/cba0bcab065f91fc862c15f534f64858a7058ff4/sompy/sompy.py
    Names and output logic changed
    :data: matrix of n rows (instances) and m cols (features)
    :lattice: 'rectangular' or 'hexagonal'
    :return: map size dictonary {"y": int, "x": int}
    """
    D = data.copy()
    num_instances = D.shape[0]
    num_features = D.shape[1]
    munits = np.ceil(5 * (num_instances ** 0.5))
    A = np.ndarray(shape=[num_features, num_features]) + np.Inf

    for i in range(num_features):
        D[:, i] = D[:, i] - np.mean(D[np.isfinite(D[:, i]), i])

    for i in range(num_features):
        for j in range(num_features):
            # Column i * Column j -> Vector
            column = D[:, i] * D[:, j]
            # [True, False, ...]
            is_index_a_number = np.isfinite(column)
            # Remove "False" indices if there are any
            cleaned_column = column[is_index_a_number]
            # Sum / Length resp. Mean?
            A[i, j] = sum(cleaned_column) / len(cleaned_column)

    eigenvalues = np.linalg.eig(A)[0]
    eigenvalues_asc = sorted(eigenvalues)
    if eigenvalues_asc[-1] == 0 or eigenvalues_asc[-2] * munits < eigenvalues_asc[-1]:
        ratio = 1
    else:
        ratio = np.sqrt(eigenvalues_asc[-1] / eigenvalues_asc[-2])

    if lattice == "rectangular":
        size1 = min(munits, round(np.sqrt(munits / ratio)))
    else:
        size1 = min(munits, round(np.sqrt(munits / ratio * np.sqrt(0.75))))

    size2 = round(munits / size1)

    return {
        "y": int(size1),
        "x": int(size2)
    }
