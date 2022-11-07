import type p5 from "p5"

export const drawDistanceMap = (s: p5, distance_map_positions: any) => {
    s.noStroke()
    for(const shape of distance_map_positions){
        s.fill(shape.color)
        s.quad(shape.tlx, shape.tly, shape.trx, shape.try, shape.brx, shape.bry, shape.blx, shape.bly);
    }
}

export const drawWinMap = (s: p5, win_map_positions: any, circle_size: any) => {
    for(const circ of win_map_positions){
        s.fill(circ.color)
        s.circle(circ.x, circ.y, circle_size) //circle(x, y, d)
    }
}


let mouseStart = {
    x: 0, y: 0,
}
let mouseEnd = {
    x: 0, y: 0,
}
let state = "start"
export const drawMouseSelection = (s: p5, distance_map_positions: any) => {
    if(state == "start"){
        mouseStart = {x: s.mouseX, y: s.mouseY}
        mouseEnd = {x:s.mouseX, y: s.mouseY}

        if(s.mouseIsPressed) state = "begin_selection"
    }
    if(state === "idle"){
        if(s.mouseIsPressed) state = "begin_selection"
    }
    if(state === "selecting"){
        mouseEnd = {x:s.mouseX, y: s.mouseY}
        if(!s.mouseIsPressed) state = "idle"
    }

    if(state === "begin_selection"){
        mouseStart = {x:s.mouseX, y: s.mouseY}
        mouseEnd = {x:s.mouseX, y: s.mouseY} //just for viz bugs
        state = "selecting" 
    }
    
    const tlx = mouseEnd.x < mouseStart.x ? mouseEnd.x : mouseStart.x
    const tly = mouseEnd.y < mouseStart.y ? mouseEnd.y : mouseStart.y
    const width = mouseEnd.x < mouseStart.x ? mouseStart.x-mouseEnd.x : mouseEnd.x-mouseStart.x
    const height = mouseEnd.y < mouseStart.y ? mouseStart.y-mouseEnd.y : mouseEnd.y-mouseStart.y

    isQuadInSelection(tlx, tly, tlx+width, tly+height, distance_map_positions, s);
}

function isQuadInSelection(mouseTLx: any, mouseTLy: any, mouseBRx: any, mouseBRy:any, distance_map_positions: any, s: p5){

    for(const shape of distance_map_positions){
        // Cond1. If A's left edge is to the right of the B's right edge, - then A is Totally to right Of B
        if(mouseTLx > shape.trx) continue;
        // Cond2. If A's right edge is to the left of the B's left edge, - then A is Totally to left Of B
        if(mouseBRx < shape.tlx) continue;
        // Cond3. If A's top edge is below B's bottom edge, - then A is Totally below B
        if(mouseTLy > shape.bry) continue;
        // Cond4. If A's bottom edge is above B's top edge, - then A is Totally above B
        if(mouseBRy < shape.tly) continue; 

        
        s.fill(253, 173, 92, 100)   
        s.stroke(255,255,255, 100)
        s.rect(
            shape.tlx,
            shape.tly,
            shape.trx-shape.tlx,
            shape.bly-shape.tly
        )

    }
}