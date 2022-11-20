import type p5 from "p5"
import type { MyRect } from "../models";

export const drawDistanceMap = (s: p5, distance_map_positions: any[], canvasSize: any) => {
    //s.noStroke()
    s.fill("green")


    const a = 2 * Math.PI / 6;
    const r = 50;

    const width = canvasSize.width; //only 100, 300, 500
    const height = canvasSize.height;

    for (let y = r; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
        for (let x = r, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
            drawHexagon(s, x, y, a, r);
        }
    }
}

const drawHexagon = (s: any, x: any, y: any, a: any, r: any) => {
    s.beginShape();
    for (let i = 0; i < 6; i++) {
        s.vertex(x + r * Math.cos(a * i), y + r * Math.sin(a * i))
    }
    s.endShape(s.CLOSE);
}