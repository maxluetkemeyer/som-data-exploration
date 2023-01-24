import type p5 from "p5"
import type { HexWithSom, Point } from "../models";
import type chroma from "chroma-js";

const a = 2 * Math.PI / 6;

export const drawDistanceMap = (s: p5, distance_map_positions: HexWithSom[], r:number, map: any, colorScale: chroma.Scale) => {
    s.noStroke()

    for(const somHex of distance_map_positions){
        const color: number = map[somHex.somY][somHex.somX];

        s.fill(colorScale(color).hex())
        drawHexagon(s, somHex.hex.center, r)
    }
}

export const drawHexagon = (s: p5, center: Point, r: number) => {
    const x = center.x, y = center.y;
    
    s.beginShape();
    for (let i = 0; i < 6; i++) {
        s.vertex(x + r * Math.cos(a * i), y + r * Math.sin(a * i))
    }
    s.endShape(s.CLOSE);
}