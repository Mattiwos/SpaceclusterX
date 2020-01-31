//const socket = io('http://mattiwos.com/');

//var x = 0 ;
//var rot = 0 ;
var radius = 20 ;
var player;
var keyDown={};
var keys=[65,68,87,83,32];




//how fast forward acceleration
var faccelspeed=0.6;

var planets=[];

//possible parameters for the coordinates and size of a planet
var cx;
var cy;
var cs;
var spawn;
var d;

function setup() {
  createCanvas(1000, 600);
  player = new Player(random(-1000,1000),random(-1000,1000),random(-1000,1000));
  for(var i=0;i<10;i++){
      spawn=false;
    while(spawn==false){
      cx=random(-1000,1000);
      cy=random(-1000,1000);
      cs=random(200,500);

      spawn=true;
      for(var j=0;j<planets.length;j++){
          if(dist(cx,cy,planets[j].x,planets[j].y)<cs+planets[j].s)spawn=false;
      }

      }
      
      planets.push(new planet (cx,cy,cs) );
  }
}

function draw() {
  d=deltaTime/10;
  background(0);

  for(var i =0;i<planets.length;i++){
    planets[i].draw();
  }

  player.draw();
  
  


}


class Player{
  constructor(ax,ay,ar){
    this.x=ax;
    this.y=ay;
    this.r=ar;
    //speed of rotation
    this.raccel=0;
    this.faccel=0;
    this.maxfs = 12;
    this.maxbs = 1;
    this.raccelspeed = 0.008;

  }
  movement(){
    
  }
  draw(){
    


    
   
    ///rotation
    if(keyDown[keys[1]]==1){ //A
      if(this.raccel<this.raccelspeed*(8))
      this.raccel+=this.raccelspeed*d;
    }if(keyDown[keys[0]]==1){ //D
      if(this.raccel>this.raccelspeed*(-8)) 
      this.raccel-=this.raccelspeed*d;
    }
    this.r+=this.raccel;
    console.log(this.raccel);
    if(this.raccel>0)this.raccel-=this.raccelspeed/2*d;
    if(this.raccel<0)this.raccel+=this.raccelspeed/2*d;
    if(abs(this.raccel)<this.raccelspeed/2)this.raccel=this.raccel/2;
    //forward and backword speeds
    if(keyDown[keys[2]]==1){
      drawSpaceship(width / 2, height /2 ,this.r, true);
      if(this.faccel<faccelspeed*(this.maxfs))
      this.faccel+=faccelspeed*d;
    
    }
    else drawSpaceship(width / 2, height /2 ,this.r, false);
    if(keyDown[keys[3]]==1){
      if(this.faccel>faccelspeed*(-1*this.maxbs))
      this.faccel-=faccelspeed*d;
    }

    this.x+=cos(this.r)*this.faccel*d;
    this.y+=sin(this.r)*this.faccel*d;

    if(this.faccel>0)this.faccel-=faccelspeed/4*d;
    if(this.faccel<0)this.faccel+=faccelspeed/4*d;
    if(dist(this.faccel,0,0,0)<faccelspeed/2)this.faccel=0;



  }

}

function keyPressed(){
  keyDown[keyCode]=1;
}
function keyReleased(){
  keyDown[keyCode]=0;
}