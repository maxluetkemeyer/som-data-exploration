import { Point, Rectangle, RectWithSom } from "../models";

export const calcDistanceMapPositions = (somSize: any, quadSize: any): RectWithSom[] => {
    const rects: RectWithSom[] = [];

    for (let x = 0; x < somSize.width; x++) {
        for (let y = 0; y < somSize.height; y++) {
            rects.push(
                new RectWithSom(
                    new Rectangle(
                        new Point(x * quadSize, y * quadSize),
                        new Point((x + 1) * quadSize, (y + 1) * quadSize)
                    ),
                    x,
                    y
                )
            )
        }
    }

    return rects;
}