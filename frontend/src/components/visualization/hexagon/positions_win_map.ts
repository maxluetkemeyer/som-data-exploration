// https://eperezcosano.github.io/hex-grid/
import { MyCircle } from "../models";

const a = 2 * Math.PI / 6;

export const calcWinMapPositions = (win_map: any, r: number, circle_size: number): MyCircle[] => {
    const circs: MyCircle[] = [];

    for (const neuron of win_map) {
        const n_x = neuron.coordinates[1]
        const n_y = neuron.coordinates[0]
    
        let y_row = (r*Math.sin(a)) + n_y * 2 * r * Math.sin(a);
        let yCenter = y_row + (n_x % 2) * r * Math.sin(a);
        let xCenter = r + n_x * r * (1 + Math.cos(a));

        for(const idx of neuron.indices){
            const xOffset = (r*Math.sin(a) - circle_size) * (Math.random() * 2 - 1)
            const yOffset = (r*Math.sin(a) - circle_size) * (Math.random() * 2 - 1)
    
            const posX = xCenter + xOffset, posY = yCenter + yOffset
    
            circs.push(
                new MyCircle(
                    posX, posY, circle_size
                )
            );
            
        }
    }

    return circs;
}