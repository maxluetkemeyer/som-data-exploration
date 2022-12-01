import type p5 from "p5"
import type { MyHexagonWithSom, MyPoint } from "../models";
import type chroma from "chroma-js";
import { store } from "@/logic/store";

const a = 2 * Math.PI / 6;
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const drawDistanceMap = (s: p5, distance_map_positions: MyHexagonWithSom[], r:number, map: any, colorScale: chroma.Scale) => {
    s.noStroke()

    for(const myHex of distance_map_positions){
        const mapVal: number = map[myHex.somY][myHex.somX];
        const man = parseFloat(store.som.colorManipulator+""); //the html input transforms this into a string
        const intensity = clamp(mapVal+man, 0, 1)

        s.fill(colorScale(intensity).hex())
        drawHexagon(s, myHex.center, r)
    }
}

export const drawHexagon = (s: p5, center: MyPoint, r: number) => {
    const x = center.x, y = center.y;
    
    s.beginShape();
    for (let i = 0; i < 6; i++) {
        s.vertex(x + r * Math.cos(a * i), y + r * Math.sin(a * i))
    }
    s.endShape(s.CLOSE);
}