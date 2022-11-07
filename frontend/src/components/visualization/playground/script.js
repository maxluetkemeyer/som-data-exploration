const dm = response_som.distance_map
const canvasMultiplier = 16


const somSize = {
    //TODO: Evaluate
    x: dm[0].length,
    y: dm.length,
}

const canvasSize = {
    width: somSize.x * canvasMultiplier,
    height: somSize.y * canvasMultiplier,
}

const quadSize = {
    x: canvasSize.width / somSize.x,
    y: canvasSize.height / somSize.y,
}

function setup() {
    //frameRate(5)

    calcWinMap()
    calcDistanceMap()
    createCanvas(canvasSize.width, canvasSize.height);
}

function draw() {    

    drawDistanceMap();
    drawWinMap();
    drawMouseSelection();
}

const win_map_circles = []
const circle_size = canvasMultiplier/5 
function calcWinMap(){
    //TODO: Add supervised color
    const data = response_query.data
    const win_map = response_som.win_map

    for(neuron of win_map){
        x = neuron.coordinates[0]
        y = neuron.coordinates[1]

        const xCenter = x * quadSize.x + quadSize.x/2 
        const yCenter = y * quadSize.y + quadSize.y/2

        const xOffset = (quadSize.x/2 - circle_size) * (Math.random()*2-1) 
        const yOffset = (quadSize.y/2 - circle_size) * (Math.random()*2-1) 

        const posX = xCenter+xOffset, posY = yCenter+yOffset

        win_map_circles.push({
            x: posX,
            y: posY,
            color: "lightgreen"
        })
    }
}

function drawWinMap(){
    for(circ of win_map_circles){
        fill(circ.color)
        circle(circ.x, circ.y, circle_size) //circle(x, y, d)
    }
}

const distance_map_quads = []
function calcDistanceMap(){
    for(let x = 0; x < somSize.x; x++){
        for(let y = 0; y < somSize.y; y++){
            const color = dm[y][x] * 255
            
            const tlx = x * quadSize.x; //top left x
            const tly = y * quadSize.y; //top left y
            
            distance_map_quads.push({
                tlx,
                tly,
                trx: tlx+quadSize.x,
                try: tly,
                brx: tlx+quadSize.x,
                bry: tly+quadSize.y,
                blx: tlx,
                bly: tly+quadSize.y,
                color
            })
        }
    }
}

function drawDistanceMap(){
    noStroke()
    for(shape of distance_map_quads){
        fill(shape.color)
        quad(shape.tlx, shape.tly, shape.trx, shape.try, shape.brx, shape.bry, shape.blx, shape.bly);
    }
}

let mouseStart = {
    x: 0, y: 0,
}
let mouseEnd = {
    x: 0, y: 0,
}
let state = "start"
function drawMouseSelection(){
    if(state == "start"){
        mouseStart = {x:mouseX, y: mouseY}
        mouseEnd = {x:mouseX, y: mouseY}

        if(mouseIsPressed) state = "begin_selection"
    }
    if(state === "idle"){
        if(mouseIsPressed) state = "begin_selection"
    }
    if(state === "selecting"){
        mouseEnd = {x:mouseX, y: mouseY}
        if(!mouseIsPressed) state = "idle"
    }

    if(state === "begin_selection"){
        mouseStart = {x:mouseX, y: mouseY}
        mouseEnd = {x:mouseX, y: mouseY} //just for viz bugs
        state = "selecting" 
    }
    
    const tlx = mouseEnd.x < mouseStart.x ? mouseEnd.x : mouseStart.x
    const tly = mouseEnd.y < mouseStart.y ? mouseEnd.y : mouseStart.y
    const width = mouseEnd.x < mouseStart.x ? mouseStart.x-mouseEnd.x : mouseEnd.x-mouseStart.x
    const height = mouseEnd.y < mouseStart.y ? mouseStart.y-mouseEnd.y : mouseEnd.y-mouseStart.y

    isQuadInSelection(tlx, tly, tlx+width, tly+height);

    
    //stroke(color(0, 0, 0, 255))
    //fill(color(100, 100, 100, 100))
    //noFill()  
    //rect(tlx, tly, width, height)
}

// https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
function isQuadInSelection(mouseTLx, mouseTLy, mouseBRx, mouseBRy){

    for(shape of distance_map_quads){
        // Cond1. If A's left edge is to the right of the B's right edge, - then A is Totally to right Of B
        if(mouseTLx > shape.trx) continue;
        // Cond2. If A's right edge is to the left of the B's left edge, - then A is Totally to left Of B
        if(mouseBRx < shape.tlx) continue;
        // Cond3. If A's top edge is below B's bottom edge, - then A is Totally below B
        if(mouseTLy > shape.bry) continue;
        // Cond4. If A's bottom edge is above B's top edge, - then A is Totally above B
        if(mouseBRy < shape.tly) continue; 

        
        fill(253, 173, 92, 100)   
        stroke(255,255,255, 100)
        rect(
            shape.tlx,
            shape.tly,
            shape.trx-shape.tlx,
            shape.bly-shape.tly
        )

    }
}