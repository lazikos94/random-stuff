class Obstacle{
    constructor(){
        this.x = width;
        this.y = height - 40;
    }
    move(){
        this.x -=10;
    }
    show(){
        fill('red');
        ellipseMode(CORNER);
        ellipse(this.x,this.y,40,40);
    }
}