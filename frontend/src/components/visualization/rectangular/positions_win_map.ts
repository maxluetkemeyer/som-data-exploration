import { store } from "@/logic/store"
import { Circle } from "../models"

export const calcWinMapPositions = (win_map: any, quadSize: any, circle_size: any): Circle[] => {
    const win_map_circles: Circle[] = []

    for (const neuron of win_map) {
        // Coordinates [y, x]
        const x = neuron.coordinates[1]
        const y = neuron.coordinates[0]

        const xCenter = x * quadSize + quadSize / 2
        const yCenter = y * quadSize + quadSize / 2

        let count = 0;
        for (const idx of neuron.indices) {
            if(count >= store.som.displayInstancesPerNeuron) break;
            count++;

            const xOffset = (quadSize / 2 - circle_size) * (Math.random() * 2 - 1)
            const yOffset = (quadSize / 2 - circle_size) * (Math.random() * 2 - 1)

            const posX = xCenter + xOffset, posY = yCenter + yOffset

            win_map_circles.push(new Circle(posX, posY, circle_size))
        }
    }

    return win_map_circles;
}