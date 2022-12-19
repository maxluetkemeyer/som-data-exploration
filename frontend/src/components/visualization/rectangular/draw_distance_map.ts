import type p5 from "p5"
import type { MyRectWithSom } from "../models";
import type chroma from "chroma-js";
import { store } from "@/logic/store";

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const drawDistanceMap = (s: p5, distance_map_positions: MyRectWithSom[], map: any, colorScale: chroma.Scale) => {
    s.noStroke()
    for (const myRect of distance_map_positions) {
        const color: number = map[myRect.somY][myRect.somX];

        s.fill(colorScale(color).hex())
        s.quad(myRect.tl.x,
            myRect.tl.y,
            myRect.tr.x,
            myRect.tr.y,
            myRect.br.x,
            myRect.br.y,
            myRect.bl.x,
            myRect.bl.y)

    }
}