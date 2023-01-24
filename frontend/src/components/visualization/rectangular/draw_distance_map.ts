import type p5 from "p5"
import type { RectWithSom } from "../models";
import type chroma from "chroma-js";

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const drawDistanceMap = (s: p5, distance_map_positions: RectWithSom[], map: any, colorScale: chroma.Scale) => {
    s.noStroke()
    for (const somRect of distance_map_positions) {
        const rect = somRect.rect;
        const color: number = map[somRect.somY][somRect.somX];

        s.fill(colorScale(color).hex())
        s.quad(rect.tl.x,
            rect.tl.y,
            rect.tr.x,
            rect.tr.y,
            rect.br.x,
            rect.br.y,
            rect.bl.x,
            rect.bl.y)

    }
}