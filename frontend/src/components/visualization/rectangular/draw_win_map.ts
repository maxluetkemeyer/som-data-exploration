import type p5 from "p5"
import type { Circle } from "../models"

export const drawWinMap = (s: p5, win_map_positions: Circle[]) => {
    for(const myCircle of win_map_positions){
        s.fill("green")
        s.circle(myCircle.x, myCircle.y, myCircle.r) //s.circle(x, y, d)
    }
}