import type p5 from "p5"
import { MyPoint, MyRect } from "../models";
import { store } from "@/logic/store";

enum DrawState {
    Start,
    Selecting,
    Calc,
}


export class RectSelection {
    private state = DrawState.Start;
    private s: p5;
    private mapPositions: MyRect[];
    private canvasSize: { width: number, height: number }
    private selections: MyRect[] = [];
    private mouseStartPoint: MyPoint = new MyPoint(0, 0)
    private onSelectedCb: Function;

    constructor(s: p5, mapPositions: MyRect[], canvasSize: any, onSelectedCb: Function) {
        this.s = s;
        this.mapPositions = mapPositions;
        this.canvasSize = canvasSize;
        this.onSelectedCb = onSelectedCb;

        for (const mapPosition of this.mapPositions) {
            store.som.selection.find((sel: any) => {
                if (sel.x == mapPosition.somX! && sel.y == mapPosition.somY) {
                    this.selections.push(
                        new MyRect(
                            new MyPoint(
                                mapPosition.tl.x + 1,
                                mapPosition.tl.y + 1
                            ),
                            new MyPoint(
                                mapPosition.br.x - 1,
                                mapPosition.br.y - 1,
                            )
                        )
                    )
                    return true;
                }
                return false;
            })
        }
    }

    mouseInCanvas() {
        if (this.s.mouseX < 0) return false;
        if (this.s.mouseX > this.canvasSize.width) return false;
        if (this.s.mouseY < 0) return false;
        if (this.s.mouseY > this.canvasSize.height) return false;
        return true;
    }

    draw() {
        const s = this.s;
        const mousePoint = new MyPoint(s.mouseX, s.mouseY)

        switch (this.state) {
            case DrawState.Start:
                if (!this.mouseInCanvas()) {
                    this.paint();
                    break;
                }

                if (s.mouseIsPressed && s.mouseButton === s.RIGHT) {
                    this.selections = [];
                    store.som.selection = [];
                    try {
                        this.onSelectedCb();
                    } catch (e) { }
                    return;
                }

                const mouseRect = new MyRect(
                    mousePoint,
                    mousePoint
                );

                if (s.mouseIsPressed) {
                    this.state = DrawState.Selecting;
                    this.selections.push(mouseRect);
                    this.mouseStartPoint = mousePoint;
                }

                this.selections.push(mouseRect);

                this.paint();

                this.selections.pop();

                break;
            case DrawState.Selecting:
                if (!this.mouseInCanvas()) break;

                if (!s.mouseIsPressed) {
                    this.state = DrawState.Calc
                    break;
                }

                let selectionRect: MyRect;
                if (mousePoint.x < this.mouseStartPoint.x) {
                    if (mousePoint.y < this.mouseStartPoint.y) {
                        selectionRect = new MyRect(
                            mousePoint,
                            this.mouseStartPoint,
                        );
                    } else {
                        selectionRect = new MyRect(
                            new MyPoint(mousePoint.x, this.mouseStartPoint.y),
                            new MyPoint(this.mouseStartPoint.x, mousePoint.y),
                        );
                    }
                } else {
                    if (mousePoint.y < this.mouseStartPoint.y) {
                        selectionRect = new MyRect(
                            new MyPoint(this.mouseStartPoint.x, mousePoint.y),
                            new MyPoint(mousePoint.x, this.mouseStartPoint.y)
                        )
                    } else {
                        selectionRect = new MyRect(
                            this.mouseStartPoint,
                            mousePoint,
                        );
                    }
                }

                this.selections[this.selections.length - 1] = selectionRect;

                this.paint();

                break;
            case DrawState.Calc:
                this.paint();

                const neurons: any = [];
                for (const myRect of this.mapPositions) {
                    for (const selRect of this.selections) {
                        if (!myRect.overlap(selRect)) continue;

                        let skip = false;
                        for (const neuron of neurons) {
                            if (neuron.x === myRect.somX && neuron.y === myRect.somY) {
                                skip = true;
                                break;
                            }
                        }
                        if (skip) continue;

                        neurons.push({
                            x: myRect.somX!,
                            y: myRect.somY!,
                        })
                    }
                }

                store.som.selection = neurons;
                this.state = DrawState.Start;

                try {
                    this.onSelectedCb();
                } catch (e) { }

                break;
        }
    }

    private paint() {
        for (const myRect of this.mapPositions) {
            for (const selRect of this.selections) {
                if (!myRect.overlap(selRect)) continue;

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
}