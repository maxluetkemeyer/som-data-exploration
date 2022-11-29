import type p5 from "p5"
import type { MyCircle } from "../models"

export const drawWinMap = (s: p5, win_map_positions: MyCircle[], circle_size: number) => {
    for(const myCircle of win_map_positions){
        s.fill(myCircle.color ?? "green")
        s.circle(myCircle.x, myCircle.y, circle_size) //circle(x, y, d)
    }
}