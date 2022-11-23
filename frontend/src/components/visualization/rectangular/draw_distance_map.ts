import type p5 from "p5"
import type { MyRect } from "../models";

export const drawDistanceMap = (s: p5, distance_map_positions: MyRect[]) => {
    s.noStroke()
    for(const myRect of distance_map_positions){
        s.fill(myRect.color)
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