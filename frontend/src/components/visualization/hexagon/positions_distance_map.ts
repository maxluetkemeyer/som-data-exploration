// https://eperezcosano.github.io/hex-grid/
import { MyHexagon, MyPoint } from "../models";
import chroma from "chroma-js";

const myScale = chroma.scale(["red", "blue"]).mode("lab")

export const calcDistanceMapPositions = (somSize: any, map: any, a: number, r: number): MyHexagon[] => {
    const hexs: MyHexagon[] = [];

    //Row wise
    for (let n_y = 0; n_y < somSize.height; n_y++) {
        let y_row = (r*Math.sin(a)) + n_y * 2 * r * Math.sin(a)

        for (let n_x = 0; n_x < somSize.width; n_x++) {
            let num: number = map[n_y][n_x];
            const color = myScale(num).hex();

            let y = y_row + (n_x % 2) * r * Math.sin(a);
            let x = r + n_x * r * (1 + Math.cos(a));

            hexs.push(
                new MyHexagon(
                    new MyPoint(x, y),
                    color
                )
            );
        }
    }

    return hexs;
}