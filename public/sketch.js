
///////////////////////////////Don't Delete///////////////////////////////////////////////////
//For website use
const socket = io('http://mattiwos.com/');
//Test Use
// const socket = io('localhost:5500');


var oplayers = [];

socket.on("updateLoc", (args)=>{
  
  var exists = false;
  
  for (var e = 0; e < args.currentplayers.length;e++){
   
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0]);
        exists = true
        

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
      }
      
    }
    if (exists == false){
      oplayers.push(new Oplayer(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0]))
     
    }
    exists = false;
  }

}) 

socket.on('init', (args)=>{
 
  var exists = false;

  for (var e = 0; e < args.currentplayers.length;e++){
    
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0]);

        exists = true
       

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
      }
      
    }
    if (exists == false){
      oplayers.push(new Oplayer(0,0,0,true,args.currentplayers[e][0]))
    }
      
    exists = false;
    }
   

  

})

//////////////////////////////////////////////////////////////////////////////////



//var x = 0 ;
//var rot = 0 ;
var radius = 20 ;
var player;
var keyDown={};
var keys=[65,68,87,83,32];


//the stars move a quarter the speed of the planets


//how fast forward acceleration
var faccelspeed=0.6;

var planets=[];
var stars=[];

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
  
  for(var i=0;i<40;i++){
    stars.push(new star (random(-1000,1000),random(-1000,1000) ) );
  }
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
  senddata();


  for(var i =0;i<stars.length;i++){
    stars[i].draw();
  }
 


  for(var i =0;i<planets.length;i++){
    planets[i].draw();
  }
  
  for(var i =0;i<oplayers.length;i++){
    oplayers[i].draw();
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
    id: socket.id,
    x: player.x,
    y: player.y,
    r: player.r,
    rocketfire: player.rocketfire
  })

}