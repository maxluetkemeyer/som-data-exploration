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
    :data: matrix of n rows (instances) and m cols (features)
    :lattice: 'rectangular' or 'hexagonal'
    :return: map size dictonary {"y": int, "x": int}
    """
    D = data.copy()
    dlen = D.shape[0]
    dim = D.shape[1]
    munits = np.ceil(5 * (dlen ** 0.5))
    A = np.ndarray(shape=[dim, dim]) + np.Inf

    for i in range(dim):
        D[:, i] = D[:, i] - np.mean(D[np.isfinite(D[:, i]), i])

    for i in range(dim):
        for j in range(dim):
            c = D[:, i] * D[:, j]
            c = c[np.isfinite(c)]
            A[i, j] = sum(c) / len(c)
            A[j, i] = A[i, j]

    VS = np.linalg.eig(A)
    eigval = sorted(np.linalg.eig(A)[0])
    if eigval[-1] == 0 or eigval[-2] * munits < eigval[-1]:
        ratio = 1
    else:
        ratio = np.sqrt(eigval[-1] / eigval[-2])

    if lattice == "rectangular":
        size1 = min(munits, round(np.sqrt(munits / ratio)))
    else:
        size1 = min(munits, round(np.sqrt(munits / ratio * np.sqrt(0.75))))

    size2 = round(munits / size1)

    return {
        "y": int(size1),
        "x": int(size2)
    }
