import json
import numpy as np
import storage


# lattice 'rect' or 'hex'
async def som_mapsize(websocket, lattice):
    print("som_mapsize task")

    map_sizes = calculate_map_size(storage.data_matrix, lattice)

    response = {
        "type": "som_mapsize",
        "map_sizes": map_sizes
    }

    await websocket.send(json.dumps(response))


# data to be clustered, represented as a matrix of n rows,
# as inputs and m cols as input features
def calculate_map_size(data, lattice):
    """
    Calculates the optimal map size given a dataset using eigenvalues and
    eigenvectors. Matlab ported
    :lattice: 'rect' or 'hex'
    :return: map sizes
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

    if lattice == "rect":
        size1 = min(munits, round(np.sqrt(munits / ratio)))
    else:
        size1 = min(munits, round(np.sqrt(munits / ratio * np.sqrt(0.75))))

    size2 = round(munits / size1)

    return [int(size1), int(size2)]
