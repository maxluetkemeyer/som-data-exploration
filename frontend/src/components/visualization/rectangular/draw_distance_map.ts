import type p5 from "p5"
import type { MyRect } from "../models";
import chroma from "chroma-js";

const myScale = chroma.scale(["red", "blue"]).mode("lab")

export const drawDistanceMap = (s: p5, distance_map_positions: MyRect[], map: any) => {
    s.noStroke()
    for(const myRect of distance_map_positions){
        let num: number = map[myRect.somY!][myRect.somX!];
        s.fill(myScale(num).hex())
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