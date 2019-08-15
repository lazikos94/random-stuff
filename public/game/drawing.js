let dinosaur;
let obstacle = [];
let hit;
let image;
document.addEventListener("keydown", event =>{
    key= event.keyCode;
    if (key = "32"){
        console.log('dab');
        dinosaur.jump(); 
    } 
});
function setup(){
    createCanvas(600,400);
    //image = loadImage('dick.png');
    dinosaur = new Dinosaur();
}

function draw(){
    if (random(1)< 0.0055){
        obstacle.push(new Obstacle());
    }
    background(0,255,0); 
    dinosaur.show();
    dinosaur.move();
    for(let entry of obstacle){
        entry.show();
        entry.move();
        if (dinosaur.hit(entry)){
            alert("dead");
            noLoop();
        }

    }
    //dinosaur.hit(obstacle);
 
}