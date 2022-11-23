import type p5 from "p5"
import { MyPoint, MyRect } from "../models";

enum DrawState {
    Start,
    Idle,
    Selecting,
    BeginSelection,
}
let mouseStart = new MyPoint(0,0)
let mouseEnd = new MyPoint(0,0)
let state = DrawState.Start;

export const drawMouseSelection = (s: p5, distance_map_positions: MyRect[]) => {
    if(state === DrawState.Start){
        mouseStart = new MyPoint(s.mouseX, s.mouseY)
        mouseEnd = new MyPoint(s.mouseX, s.mouseY)

        if(s.mouseIsPressed) state = DrawState.BeginSelection
    }
    if(state === DrawState.Idle){
        if(s.mouseIsPressed) state = DrawState.BeginSelection
    }
    if(state === DrawState.Selecting){
        mouseEnd = new MyPoint(s.mouseX, s.mouseY)
        if(!s.mouseIsPressed) state = DrawState.Idle
    }

    if(state === DrawState.BeginSelection){
        mouseStart = new MyPoint(s.mouseX, s.mouseY)
        mouseEnd = new MyPoint(s.mouseX, s.mouseY) //just for viz bugs
        state = DrawState.Selecting
    }
    
    const tlx = mouseEnd.x < mouseStart.x ? mouseEnd.x : mouseStart.x
    const tly = mouseEnd.y < mouseStart.y ? mouseEnd.y : mouseStart.y
    const width = mouseEnd.x < mouseStart.x ? mouseStart.x-mouseEnd.x : mouseEnd.x-mouseStart.x
    const height = mouseEnd.y < mouseStart.y ? mouseStart.y-mouseEnd.y : mouseEnd.y-mouseStart.y

    const mouseRect = new MyRect(
        new MyPoint(tlx, tly),
        new MyPoint(tlx+width, tly+height)
    )

    for(const myRect of distance_map_positions){
        if(!myRect.overlap(mouseRect)) continue;

        s.fill(253, 173, 92, 100)   
        s.stroke(255,255,255, 100)
        s.rect(
            myRect.tl.x,
            myRect.tl.y,
            myRect.width,
            myRect.height,
        )
    }
}