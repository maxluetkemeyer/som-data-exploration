// https://eperezcosano.github.io/hex-grid/
import { Hexagon, HexWithSom, Point } from "../models";

const a = 2 * Math.PI / 6;

export const calcDistanceMapPositions = (somSize: any, r: number): HexWithSom[] => {
    const hexs: HexWithSom[] = [];

    //Row wise
    for (let n_y = 0; n_y < somSize.height; n_y++) {
        let y_row = (r*Math.sin(a)) + n_y * 2 * r * Math.sin(a)

        for (let n_x = 0; n_x < somSize.width; n_x++) {
            let y = y_row + (n_x % 2) * r * Math.sin(a);
            let x = r + n_x * r * (1 + Math.cos(a));

            hexs.push(
                new HexWithSom(
                    new Hexagon(
                        new Point(x, y)
                    ),
                    n_x,
                    n_y
                )
            );
        }
    }

    return hexs;
}