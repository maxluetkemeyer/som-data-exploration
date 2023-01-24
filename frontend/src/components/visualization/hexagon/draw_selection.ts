import type p5 from "p5"
import { Point, HexWithSom, DrawState, Rectangle } from "../models";
import { store } from "@/logic/store";
import { drawHexagon } from "./draw_distance_map";

export class HexSelection {
    private state = DrawState.Start;
    private s: p5;
    private r: number;
    private mapPositions: HexWithSom[];
    private canvasSize: { width: number, height: number }
    private selections: Rectangle[] = [];
    private mouseStartPoint: Point = new Point(0, 0)
    private onSelectedCb: Function;

    constructor(s: p5, mapPositions: HexWithSom[], canvasSize: any, r: number, onSelectedCb: Function) {
        this.s = s;
        this.r = r;
        this.mapPositions = mapPositions;
        this.canvasSize = canvasSize;
        this.onSelectedCb = onSelectedCb;

        for (const mapPosition of this.mapPositions) {
            store.som.selection.find((sel: any) => {
                if (sel.x == mapPosition.somX && sel.y == mapPosition.somY) {
                    this.selections.push(
                        new Rectangle(
                            mapPosition.hex.center,
                            mapPosition.hex.center
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
        const mousePoint = new Point(s.mouseX, s.mouseY)

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

                const mouseRect = new Rectangle(
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

                let selectionRect: Rectangle;
                if (mousePoint.x < this.mouseStartPoint.x) {
                    if (mousePoint.y < this.mouseStartPoint.y) {
                        selectionRect = new Rectangle(
                            mousePoint,
                            this.mouseStartPoint,
                        );
                    } else {
                        selectionRect = new Rectangle(
                            new Point(mousePoint.x, this.mouseStartPoint.y),
                            new Point(this.mouseStartPoint.x, mousePoint.y),
                        );
                    }
                } else {
                    if (mousePoint.y < this.mouseStartPoint.y) {
                        selectionRect = new Rectangle(
                            new Point(this.mouseStartPoint.x, mousePoint.y),
                            new Point(mousePoint.x, this.mouseStartPoint.y)
                        )
                    } else {
                        selectionRect = new Rectangle(
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
                for (const somHex of this.mapPositions) {
                    for (const selRect of this.selections) {
                        if (!selRect.isPointInside(somHex.hex.center)) continue;

                        let skip = false;
                        for (const neuron of neurons) {
                            if (neuron.x === somHex.somX && neuron.y === somHex.somY) {
                                skip = true;
                                break;
                            }
                        }
                        if (skip) continue;

                        neurons.push({
                            x: somHex.somX,
                            y: somHex.somY,
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
        for (const somHex of this.mapPositions) {
            for (const selRect of this.selections) {
                if (!selRect.isPointInside(somHex.hex.center)) continue;

                this.s.fill(253, 173, 92, 100)
                this.s.stroke(255, 255, 255, 100)
                drawHexagon(this.s, somHex.hex.center, this.r)
            }
        }
    }
}