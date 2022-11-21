// https://eperezcosano.github.io/hex-grid/
import { MyHexagon, MyPoint } from "../models";

export const calcDistanceMapPositions = (somSize: any, distance_map: any, a: number, r: number): MyHexagon[] => {
    const hexs: MyHexagon[] = [];

    //Row wise
    for (let n_y = 0; n_y < somSize.height; n_y++) {
        let y_row = (r*Math.sin(a)) + n_y * 2 * r * Math.sin(a)

        for (let n_x = 0; n_x < somSize.width; n_x++) {
            const color = distance_map[n_y][n_x] * -255 + 255
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