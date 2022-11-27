import type p5 from "p5"
import { MyPoint, MyRect } from "../models";
import { store } from "@/logic/store";

enum DrawState {
    Start,
    Idle,
    Selecting,
    BeginSelection,
}


export class RectSelection {
    state = DrawState.Idle;
    s: p5;
    mapPositions: MyRect[];
    canvasSize: {width: number, height: number}

    constructor(s: p5, mapPositions: MyRect[], canvasSize: any) {
        this.s = s;
        this.mapPositions = mapPositions;
        this.canvasSize = canvasSize;
    }

    canPaint(){
        if(!this.s.mouseIsPressed) return false;

        if(this.s.mouseX < 0) return false;
        if(this.s.mouseX > this.canvasSize.width) return false;
        if(this.s.mouseY < 0) return false;
        if(this.s.mouseY > this.canvasSize.height) return false;
        return true;
    }

    draw() {
        /*if (this.state === DrawState.Start) {
            store.som.selection.mouseStart = new MyPoint(this.s.mouseX, this.s.mouseY)
            store.som.selection.mouseEnd = new MyPoint(this.s.mouseX, this.s.mouseY)

            if (this.canPaint()) this.state = DrawState.BeginSelection
        }*/
        if (this.state === DrawState.Idle) {
            if (this.canPaint()) this.state = DrawState.BeginSelection
        }
        if (this.state === DrawState.Selecting) {
            store.som.selection.mouseEnd = new MyPoint(this.s.mouseX, this.s.mouseY)
            if (!this.s.mouseIsPressed) this.state = DrawState.Idle
        }

        if (this.state === DrawState.BeginSelection) {
            store.som.selection.mouseStart = new MyPoint(this.s.mouseX, this.s.mouseY)
            store.som.selection.mouseEnd = new MyPoint(this.s.mouseX, this.s.mouseY) //just for viz bugs
            this.state = DrawState.Selecting
        }

        const tlx = store.som.selection.mouseEnd.x < store.som.selection.mouseStart.x ? store.som.selection.mouseEnd.x : store.som.selection.mouseStart.x
        const tly = store.som.selection.mouseEnd.y < store.som.selection.mouseStart.y ? store.som.selection.mouseEnd.y : store.som.selection.mouseStart.y
        const width = store.som.selection.mouseEnd.x < store.som.selection.mouseStart.x ? store.som.selection.mouseStart.x - store.som.selection.mouseEnd.x : store.som.selection.mouseEnd.x - store.som.selection.mouseStart.x
        const height = store.som.selection.mouseEnd.y < store.som.selection.mouseStart.y ? store.som.selection.mouseStart.y - store.som.selection.mouseEnd.y : store.som.selection.mouseEnd.y - store.som.selection.mouseStart.y

        const mouseRect = new MyRect(
            new MyPoint(tlx, tly),
            new MyPoint(tlx + width, tly + height)
        )

        for (const myRect of this.mapPositions) {
            if (!myRect.overlap(mouseRect)) continue;

            this.s.fill(253, 173, 92, 100)
            this.s.stroke(255, 255, 255, 100)
            this.s.rect(
                myRect.tl.x,
                myRect.tl.y,
                myRect.width,
                myRect.height,
            )
        }
    }
}