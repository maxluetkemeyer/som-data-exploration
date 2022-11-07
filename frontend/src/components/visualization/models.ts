export class MyPoint {
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

export class MyRect {
    tl: MyPoint;
    br: MyPoint;

    constructor(tl: MyPoint, br: MyPoint){
        this.tl = tl;
        this.br = br;
    }

    getWidth(){
        return this.br.x - this.tl.x
    }

    getHeight(){
        return this.br.y - this.tl.y
    }

    getTr(){
        return new MyPoint(this.br.x, this.tl.y);
    }

    getBl(){
        return new MyPoint(this.tl.x, this.br.y);5
    }
}

export class MyCircle extends MyPoint{
    r: number;

    constructor(x: number, y: number, r:number){
        super(x, y);
        this.r = r
    }
}