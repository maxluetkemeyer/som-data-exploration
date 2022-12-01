import type p5 from "p5"
import type { MyHexagon, MyPoint } from "../models";

export const drawDistanceMap = (s: p5, distance_map_positions: MyHexagon[], a: number, r:number) => {
    s.noStroke()

    for(const myHex of distance_map_positions){
        s.fill(myHex.color);
        drawHexagon(s, myHex.center, a, r)
    }
}

const drawHexagon = (s: p5, center: MyPoint, a: number, r: number) => {
    const x = center.x, y = center.y;
    
    s.beginShape();
    for (let i = 0; i < 6; i++) {
        s.vertex(x + r * Math.cos(a * i), y + r * Math.sin(a * i))
    }
    s.endShape(s.CLOSE);
}