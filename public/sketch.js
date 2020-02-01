
///////////////////////////////Don't Delete///////////////////////////////////////////////////
//For website use
// const socket = io('http://mattiwos.com/');
//Test Use
const socket = io('localhost:5500');


var oplayers = [];

socket.on("update", (args)=>{

  for (var i = 0; i < oplayers.length;i++){
    if (oplayers[i].id = args.id){
      oplayers[i].update(args.x,args.y,args.r,args.rocketfire)

    }
  }

}) 
socket.on('init', (arg)=>{
  console.log(arg.currentplayers)
})

//////////////////////////////////////////////////////////////////////////////////



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
//Other players



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

function keyPressed(){
  keyDown[keyCode]=1;
}
function keyReleased(){
  keyDown[keyCode]=0;
}
function senddata(){
  socket.emit("currData",{
    x: player.x,
    y: player.y,
    y: player.y,
    rocketfire: player.rocketfire
  })

}