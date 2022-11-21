export class MyPoint {
    x: number;
    y: number;
    color?: string;

    constructor(x: number, y: number, color?: string){
        this.x = x
        this.y = y
        this.color = color
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
    color?: any;

    constructor(tl: MyPoint, br: MyPoint, color?: any){
        this.tl = tl;
        this.br = br;
        this.tr = new MyPoint(this.br.x, this.tl.y);
        this.bl = new MyPoint(this.tl.x, this.br.y);
        this.width = this.br.x - this.tl.x;
        this.height = this.br.y - this.tl.y;
        this.color = color;
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
}

export class MyHexagon {
    center: MyPoint;
    color?: any;

    constructor(center: MyPoint, color?: any){
        this.center = center;
        this.color = color;
    }
}