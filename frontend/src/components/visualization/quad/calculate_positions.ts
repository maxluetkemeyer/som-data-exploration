export const calcDistanceMapPositions = (somSize: any, quadSize: any, distance_map: any) => {
    const rects = [];

    for (let x = 0; x < somSize.x; x++) {
        for (let y = 0; y < somSize.y; y++) {
            const color = distance_map[y][x] * 255

            const tlx = x * quadSize.x; //top left x
            const tly = y * quadSize.y; //top left y

            rects.push({
                tlx,
                tly,
                trx: tlx + quadSize.x,
                try: tly,
                brx: tlx + quadSize.x,
                bry: tly + quadSize.y,
                blx: tlx,
                bly: tly + quadSize.y,
                color
            })
        }
    }

    return rects;
}

export const calcWinMapPositions = (win_map: any, quadSize: any, circle_size: any) => {
    //TODO: Add supervised color
    //const data = response_query.data
    //const win_map = response_som.win_map
    const win_map_circles = []

    for (const neuron of win_map) {
        const x = neuron.coordinates[0]
        const y = neuron.coordinates[1]

        const xCenter = x * quadSize.x + quadSize.x / 2
        const yCenter = y * quadSize.y + quadSize.y / 2

        const xOffset = (quadSize.x / 2 - circle_size) * (Math.random() * 2 - 1)
        const yOffset = (quadSize.y / 2 - circle_size) * (Math.random() * 2 - 1)

        const posX = xCenter + xOffset, posY = yCenter + yOffset

        win_map_circles.push({
            x: posX,
            y: posY,
            color: "lightgreen"
        })
    }

    return win_map_circles;
}