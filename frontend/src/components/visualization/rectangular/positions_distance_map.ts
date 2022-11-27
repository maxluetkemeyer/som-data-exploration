import { MyPoint, MyRect  } from "../models";
import chroma from "chroma-js";

const myScale = chroma.scale(["red", "blue"]).mode("lab")

export const calcDistanceMapPositions = (somSize: any, quadSize: any, distance_map: any): MyRect[] => {
    const rects: MyRect[] = [];

    for (let x = 0; x < somSize.width; x++) {
        for (let y = 0; y < somSize.height; y++) {
            //const color = distance_map[y][x] * -255 + 255
            let num: number = distance_map[y][x];
            const color = myScale(num).hex();

            rects.push(new MyRect(
                new MyPoint(x*quadSize, y*quadSize),
                new MyPoint((x+1)*quadSize, (y+1)*quadSize),
                color,
            ))
        }
    }

    return rects;
}