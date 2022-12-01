import type p5 from "p5"
import type { MyCircle } from "../models"

export const drawWinMap = (s: p5, win_map_positions: MyCircle[]) => {
    for(const myCircle of win_map_positions){
        s.fill("green")
        s.circle(myCircle.x, myCircle.y, myCircle.r) //circle(x, y, d)
    }
}