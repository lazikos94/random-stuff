const gameCanvas = document.getElementById("gameCanvas");
const context = gameCanvas.getContext("2d");
const canvas_border_color='red';
const canvas_background_color='black';
const snek_color='blue';
const snek_skin='lightgreen';
let snake = [  
{x: 250, y: 250},  
{x: 240, y: 250}, 
{x: 230, y: 250}, 
{x: 220, y: 250}, 
{x: 210, y: 250},
{x: 200, y: 250},
];

let dx=10;
let dy=0;

//main();
document.addEventListener("keydown", changeDirection);

onTick();

function onTick(){
	if (didGameEnd())return;
	changeDirection=false;
	createCanvas();
	drawSnek();
	moveSnek();
	play();
;}





/*function main(){
	timer = setInterval(onTick, 50)}
}*/
	

function createCanvas() {
      context.fillStyle = canvas_background_color;
      context.strokeStyle = canvas_border_color;
	  context.lineWidth=5;
      context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}



function drawSnek(){
	snake.forEach(drawSnekPart);
}

function drawSnekPart(snekPart){
	context.fillStyle =snek_color;
	context.strokeStyle = snek_skin;
	context.lineWidth=1;
	context.fillRect(snekPart.x, snekPart.y, 10, 10);  
	context.strokeRect(snekPart.x, snekPart.y, 10, 10);
	
	/*context.arc(snekPart.x,snekPart.y,10,0,2*Math.PI);
	context.fillStyle =snek_color;
	context.strokeStyle = snek_skin;
	context.lineWidth=1;
	context.fill();
	context.stroke();*/
}	

function moveSnek(){
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
	  snake.pop();
}

function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
	  //const SPACE=32;

      //if (changingDirection) return;
     // changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }
	
function didGameEnd() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;
	  
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

function stop(){
clearTimeout(timer);  
}
function play(){

timer = setTimeout(onTick,50);
}
function speed(){
onTick();
}
document.addEventListener("keydown",function (e){
	var key = e.keyCode;
	if ( key == "32"){
	stop();
	}
	else if (key =="13"){
	
	play();
	}
	else if (key =="82"){
	speed();
	}
		
});


	


