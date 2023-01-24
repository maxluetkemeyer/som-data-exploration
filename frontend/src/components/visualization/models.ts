export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

export class Circle extends Point{
    r: number;

    constructor(x: number, y: number, r:number){
        super(x, y);
        this.r = r
    }
}

export class Rectangle {
    tl: Point;
    br: Point;
    tr: Point;
    bl: Point;
    width: number;
    height: number;

    constructor(tl: Point, br: Point){
        this.tl = tl;
        this.br = br;
        this.tr = new Point(this.br.x, this.tl.y);
        this.bl = new Point(this.tl.x, this.br.y);
        this.width = this.br.x - this.tl.x;
        this.height = this.br.y - this.tl.y;
    }

    overlap(rect: Rectangle): boolean{
        const B = rect;
        // Cond1. If A's left edge is to the right of the B's right edge, - then A is Totally to right Of B
        if(this.tl.x > B.tr.x) return false;
        // Cond2. If A's right edge is to the left of the B's left edge, - then A is Totally to left Of B
        if(this.tr.x < B.tl.x) return false;
        // Cond3. If A's top edge is below B's bottom edge, - then A is Totally below B
        if(this.tl.y > B.bl.y) return false;
        // Cond4. If A's bottom edge is above B's top edge, - then A is Totally above B
        if(this.bl.y < B.tl.y) return false;

        return true;
    }

    isPointInside(point: Point): boolean {
        if(this.tl.x > point.x) return false;
        if(this.br.x < point.x) return false;
        if(this.tl.y > point.y) return false;
        if(this.br.y < point.y) return false;

        return true;
    }
}

export class RectWithSom{
    somX: number;
    somY: number;
    rect: Rectangle;

    constructor(rect: Rectangle, somX: number, somY: number){
        this.rect = rect;
        this.somX = somX;
        this.somY = somY;
    }
}

export class Hexagon {
    center: Point;

    constructor(center: Point){
        this.center = center;
    }
}

export class HexWithSom {
    somX: number;
    somY: number;
    hex: Hexagon;

    constructor(hex: Hexagon, somX: number, somY: number){
        this.hex = hex;
        this.somX = somX;
        this.somY = somY;
    }
}

export enum DrawState {
    Start,
    Selecting,
    Calc,
}