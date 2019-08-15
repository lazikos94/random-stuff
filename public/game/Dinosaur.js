class Dinosaur{
    constructor(){
        this.x = 40;
        this.y = height-50;
        this.yvelocity = 0;
        this.gravity = 3;

    }
    jump(){
        if (this.y == height - 50) {
            this.yvelocity= -30;
        }
    }
    
    show(){
        //image(img,this.x,this.y,50,50);
        fill(51);
        ellipseMode(CORNER);
        ellipse(this.x,this.y,50,50);

    }
    move(){
        this.y += this.yvelocity;
        this.yvelocity+= this.gravity;
        this.y = constrain(this.y, 0, height - 50);
    }
    hit(Obstacle){
        let x1 = this.x + 50 * 0.5;
        let y1 = this.y + 50 * 0.5;
        let x2 = Obstacle.x + 50 * 0.5;
        let y2 = Obstacle.y + 50 * 0.5;
        return collideCircleCircle(x1,y1,50,x2,y2,40);
    }

}