// https://eperezcosano.github.io/hex-grid/
import { MyHexagonWithSom, MyPoint } from "../models";

const a = 2 * Math.PI / 6;

export const calcDistanceMapPositions = (somSize: any, r: number): MyHexagonWithSom[] => {
    const hexs: MyHexagonWithSom[] = [];

    //Row wise
    for (let n_y = 0; n_y < somSize.height; n_y++) {
        let y_row = (r*Math.sin(a)) + n_y * 2 * r * Math.sin(a)

        for (let n_x = 0; n_x < somSize.width; n_x++) {
            let y = y_row + (n_x % 2) * r * Math.sin(a);
            let x = r + n_x * r * (1 + Math.cos(a));

            hexs.push(
                new MyHexagonWithSom(
                    new MyPoint(x, y),
                    n_x,
                    n_y
                )
            );
        }
    }

    return hexs;
}