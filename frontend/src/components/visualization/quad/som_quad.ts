import p5 from "p5";
import { drawDistanceMap } from "./draw_distance_map";
import { calcDistanceMapPositions } from "./positions_distance_map";
import { drawMouseSelection } from "./draw_mouse_selection";
import { drawWinMap } from "./draw_win_map";
import { calcWinMapPositions } from "./positions_win_map";

let sketchInstance;

export const initQuadSom = (som: any, somSize: any, canvasSize: any) => {
    const quadSize = {
        x: canvasSize.width / somSize.width,
        y: canvasSize.height / somSize.height,
    }
    const circle_size = canvasSize.width * 0.015;

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