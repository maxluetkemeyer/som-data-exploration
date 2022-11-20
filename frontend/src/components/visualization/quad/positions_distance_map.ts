import { MyPoint, MyRect  } from "../models";

export const calcDistanceMapPositions = (somSize: any, quadSize: any, distance_map: any): MyRect[] => {
    const rects: MyRect[] = [];

    for (let x = 0; x < somSize.width; x++) {
        for (let y = 0; y < somSize.height; y++) {
            const color = distance_map[y][x] * -255 + 255

            rects.push(new MyRect(
                new MyPoint(x*quadSize, y*quadSize),
                new MyPoint((x+1)*quadSize, (y+1)*quadSize),
                color,
            ))
        }
    }

    return rects;
}