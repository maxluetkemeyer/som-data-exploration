export class MyPoint {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    toObject(){
        return {
            x: this.x,
            y: this.y
        }
    }
}

export class MyCircle extends MyPoint{
    r: number;

    constructor(x: number, y: number, r:number){
        super(x, y);
        this.r = r
    }
}

export class MyRect {
    tl: MyPoint;
    br: MyPoint;
    tr: MyPoint;
    bl: MyPoint;
    width: number;
    height: number;

    constructor(tl: MyPoint, br: MyPoint){
        this.tl = tl;
        this.br = br;
        this.tr = new MyPoint(this.br.x, this.tl.y);
        this.bl = new MyPoint(this.tl.x, this.br.y);
        this.width = this.br.x - this.tl.x;
        this.height = this.br.y - this.tl.y;
    }

    overlap(rect: MyRect): boolean{
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

    isPointInside(point: MyPoint): boolean {
        if(this.tl.x > point.x) return false;
        if(this.br.x < point.x) return false;
        if(this.tl.y > point.y) return false;
        if(this.br.y < point.y) return false;

        return true;
    }
}

export class MyRectWithSom extends MyRect{
    somX: number;
    somY: number;

    constructor(tl: MyPoint, br: MyPoint, somX: number, somY: number){
        super(tl, br);
        this.somX = somX;
        this.somY = somY;
    }
}

export class MyHexagon {
    center: MyPoint;

    constructor(center: MyPoint){
        this.center = center;
    }
}

export class MyHexagonWithSom extends MyHexagon{
    somX: number;
    somY: number;

    constructor(center: MyPoint, somX: number, somY: number){
        super(center);
        this.somX = somX;
        this.somY = somY;
    }
}

export enum DrawState {
    Start,
    Selecting,
    Calc,
}