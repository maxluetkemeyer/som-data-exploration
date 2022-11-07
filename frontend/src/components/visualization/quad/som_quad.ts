import p5 from "p5";
import { calcDistanceMapPositions, calcWinMapPositions } from "./calculate_positions";
import { drawDistanceMap, drawMouseSelection, drawWinMap } from "./draw";

let sketchInstance;

export const initQuadSom = (som: any, somSize: any, canvasSize: any) => {
    const quadSize = {
        x: canvasSize.width / somSize.x,
        y: canvasSize.height / somSize.y,
    }
    const circle_size = 4;

    const distance_map_positions = calcDistanceMapPositions(somSize, quadSize, som.distance_map);
    const win_map_positions = calcWinMapPositions(som.win_map, quadSize, circle_size);

    const sketch = (s: p5) => {
        s.setup = () => {
            const canvas = s.createCanvas(canvasSize.width, canvasSize.height)
            canvas.parent("canvasContainer")

            s.background("blue")
        }

        s.draw = () => {
            drawDistanceMap(s, distance_map_positions);
            drawWinMap(s, win_map_positions, circle_size);
            drawMouseSelection(s, distance_map_positions);
        }
    }

    sketchInstance = new p5(sketch);
}