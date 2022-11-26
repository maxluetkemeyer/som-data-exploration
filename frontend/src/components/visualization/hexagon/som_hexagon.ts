import p5 from "p5";
import { drawDistanceMap } from "./draw_distance_map";
import { drawWinMap } from "./draw_win_map";
import { calcDistanceMapPositions } from "./positions_distance_map";
import { calcWinMapPositions } from "./positions_win_map";

let sketchInstance;

export const initHexagonSom = (som: any, map: any, somSize: any, canvasSize: any, parentId: string) => {
    const a = 2 * Math.PI / 6;
    const r_width = canvasSize.width / (1 + somSize.width + somSize.width * Math.cos(a) - Math.cos(a))
    const r_height = canvasSize.height / (Math.sin(a) * (1+somSize.height*2))
    const r = Math.min(r_width, r_height);

    const circle_size = r * 0.3;


    const distance_map_positions = calcDistanceMapPositions(somSize, map, a, r);
    const win_map_positions = calcWinMapPositions(som.win_map, a, r, circle_size)

    const sketch = (s: p5) => {
        s.setup = () => {
            const canvas = s.createCanvas(canvasSize.width, canvasSize.height)
            //const canvas = s.createCanvas(somSize.width * 2 * r, canvasSize.height)
            canvas.parent(parentId)

            s.frameRate(5) //TODO: Reduce framerate or delete?
        }

        s.draw = () => {
            drawDistanceMap(s, distance_map_positions, a, r);
            drawWinMap(s, win_map_positions, circle_size);
            //drawMouseSelection(s, distance_map_positions);
        }
    }

    sketchInstance = new p5(sketch);
}