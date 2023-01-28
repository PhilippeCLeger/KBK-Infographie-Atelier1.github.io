export class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    plus(p){
        return new Point(this.x + p.x, this.y + p.y);
    }

    negatif(){
        return new Point(-thix.x, -this.y);
    }

    moins(p){
        return this.plus(p.negatif());
    }
}

export class Rectangle{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}