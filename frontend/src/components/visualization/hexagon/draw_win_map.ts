import type p5 from "p5"
import type { Circle } from "../models"

export const drawWinMap = (s: p5, win_map_positions: Circle[], circle_size: number) => {
    for(const myCircle of win_map_positions){
        s.fill("green")
        s.circle(myCircle.x, myCircle.y, circle_size) //circle(x, y, d)
    }
}