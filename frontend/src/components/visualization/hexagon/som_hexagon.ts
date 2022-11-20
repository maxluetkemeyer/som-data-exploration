import p5 from "p5";
import { drawDistanceMap } from "./draw_distance_map";
//import { calcDistanceMapPositions } from "./positions_distance_map";

let sketchInstance;

export const initHexagonSom = (som: any, somSize: any, canvasSize: any) => {
    const qsw = canvasSize.width / somSize.width;
    const qsh = canvasSize.height / somSize.height;
    const quadSize = Math.min(qsw, qsh)
    const r = quadSize/2

    //const distance_map_positions = calcDistanceMapPositions(somSize, quadSize, som.distance_map);

    const sketch = (s: p5) => {
        s.setup = () => {
            const canvas = s.createCanvas(canvasSize.width, canvasSize.height)
            canvas.parent("canvasContainer")

            s.background("blue")
        }

        s.draw = () => {
            const distance_map_positions: any[] = [];
            drawDistanceMap(s, distance_map_positions, canvasSize);
            //drawWinMap(s, win_map_positions, circle_size);
            //drawMouseSelection(s, distance_map_positions);
        }
    }

    sketchInstance = new p5(sketch);
}