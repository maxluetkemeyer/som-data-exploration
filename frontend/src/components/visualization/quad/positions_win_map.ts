import { MyCircle } from "../models"

export const calcWinMapPositions = (win_map: any, quadSize: any, circle_size: any): MyCircle[] => {
    //TODO: Add supervised color
    //const data = response_query.data
    //const win_map = response_som.win_map
    const win_map_circles: MyCircle[] = []

    for (const neuron of win_map) {
        const x = neuron.coordinates[1]
        const y = neuron.coordinates[0]

        const xCenter = x * quadSize + quadSize / 2
        const yCenter = y * quadSize + quadSize / 2

        const xOffset = (quadSize / 2 - circle_size) * (Math.random() * 2 - 1)
        const yOffset = (quadSize / 2 - circle_size) * (Math.random() * 2 - 1)

        const posX = xCenter + xOffset, posY = yCenter + yOffset

        /*win_map_circles.push({
            x: posX,
            y: posY,
            color: "lightgreen"
        })*/
        win_map_circles.push(new MyCircle(posX, posY, 1))
    }

    return win_map_circles;
}