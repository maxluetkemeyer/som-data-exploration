import p5 from "p5";
import { drawDistanceMap } from "./draw_distance_map";
import { calcDistanceMapPositions } from "./positions_distance_map";
import { drawMouseSelection } from "./draw_mouse_selection";
import { drawWinMap } from "./draw_win_map";
import { calcWinMapPositions } from "./positions_win_map";

let sketchInstance;

//TODO: Square or rectangular
export const initRectangularSom = (som: any, somSize: any, canvasSize: any) => {
    const qsw = canvasSize.width / somSize.width;
    const qsh = canvasSize.height / somSize.height;

    const quadSize = Math.min(qsw, qsh)
    const circle_size = quadSize * 0.2;

    const distance_map_positions = calcDistanceMapPositions(somSize, quadSize, som.distance_map);
    const win_map_positions = calcWinMapPositions(som.win_map, quadSize, circle_size);

    const sketch = (s: p5) => {
        s.setup = () => {
            const canvas = s.createCanvas(canvasSize.width, canvasSize.height)
            canvas.parent("canvasContainer")

            //s.background("blue")
        }

        s.draw = () => {
            drawDistanceMap(s, distance_map_positions);
            drawWinMap(s, win_map_positions);
            drawMouseSelection(s, distance_map_positions);
        }
    }

    sketchInstance = new p5(sketch);
}