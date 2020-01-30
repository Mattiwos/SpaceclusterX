//const socket = io('http://mattiwos.com/');

//var x = 0 ;
//var rot = 0 ;
var radius = 20 ;
var player;
var keyDown={};
var keys=[65,68,87,83,32];

//how fast the rotation accelerates
var raccelspeed=0.008;

//how fast forward acceleration
var faccelspeed=0.6;

var planets=[];

//possible parameters for the coordinates and size of a planet
var cx;
var cy;
var cs;
var spawn;

function setup() {
  createCanvas(1000, 600);
  player = new Player(
    random(-1000,1000),random(-1000,1000),random(-1000,1000));
    for(var i=0;i<10;i++){
        spawn=false;
        cx=random(-1000,1000);
        cy=random(-1000,1000);
        cs=random(200,500);
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

  }
  movement(){
    
  }
  draw(){
    



    
    if(keyDown[keys[2]]==1){
      drawSpaceship(width / 2, height /2 ,this.r, true);
    }else
    drawSpaceship(width / 2, height /2 ,this.r, false);
    if(keyDown[keys[1]]==1){
      if(this.raccel<raccelspeed*(8))
      this.raccel+=raccelspeed;
    }if(keyDown[keys[0]]==1){
      if(this.raccel>raccelspeed*(-8))
      this.raccel-=raccelspeed;
    }
    this.r+=this.raccel;
    if(this.raccel>0)this.raccel-=raccelspeed/2;
    if(this.raccel<0)this.raccel+=raccelspeed/2;
    if(dist(this.raccel,0,0,0)<raccelspeed/2)this.raccel=0;

    if(keyDown[keys[2]]==1){
      if(this.faccel<faccelspeed*(12))
      this.faccel+=faccelspeed;
    }if(keyDown[keys[3]]==1){
      if(this.faccel>faccelspeed*(-7))
      this.faccel-=faccelspeed;
    }
    this.x+=cos (this.r)*this.faccel;
    this.y+=sin (this.r)*this.faccel;
    if(this.faccel>0)this.faccel-=faccelspeed/4;
    if(this.faccel<0)this.faccel+=faccelspeed/4;
    if(dist(this.faccel,0,0,0)<faccelspeed/4)this.faccel=0;



  }

}

function keyPressed(){
  keyDown[keyCode]=1;
}
function keyReleased(){
  keyDown[keyCode]=0;
}