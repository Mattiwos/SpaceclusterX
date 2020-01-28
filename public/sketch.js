//const socket = io('http://mattiwos.com/');

var x = 0 ;
var rot = 0 ;
var radius = 20 ;
var player;
function setup() {
  createCanvas(1000, 600);
  player = new Player(x,y,r);

}

function draw() {
  background(0);
  player.draw();
  
}


class Player{
  constructor(){


  }
  movement(){
    
  }
  draw(){
    fill(255,0,0);
    stroke(200,0,0);
    strokeWeight(3);
    drawSpaceship(width / 2, height /2 ,this.rot);
    print(width/2);
  }

}