import { MyPoint, MyRectWithSom  } from "../models";

export const calcDistanceMapPositions = (somSize: any, quadSize: any): MyRectWithSom[] => {
    const rects: MyRectWithSom[] = [];

    for (let x = 0; x < somSize.width; x++) {
        for (let y = 0; y < somSize.height; y++) {
            rects.push(new MyRectWithSom(
                new MyPoint(x*quadSize, y*quadSize),
                new MyPoint((x+1)*quadSize, (y+1)*quadSize),
                x,
                y
            ))
        }
    }

    return rects;
}