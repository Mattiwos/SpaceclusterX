
///////////////////////////////Don't Delete///////////////////////////////////////////////////
//For website use
// const socket = io('http://mattiwos.com/');
//Test Use
const socket = io(window.location.origin,{transports: ['websocket']});


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

    for (var i = 0; i < args.planets.length; i++){
      planets.push(new planet(args.planets[i][0],args.planets[i][1],args.planets[i][2], args.planets[i][3], args.planets[i][4], args.planets[i][5]))
    }
    for (var i = 0; i < args.stars.length; i++){
      stars.push(new star(args.stars[i][0],args.stars[i][1]));
    }
   

  

})

socket.on('mapUpdate',(args)=>{
  
})

//////////////////////////////////////////////////////////////////////////////////

var keyDown={};
var keys=[65,68,87,83,32];


var oplayers = [];
var player;
var planets=[];
var stars=[];

var d;
//Other players



function setup() {
  createCanvas(1000, 600);

  player = new Player(random(-1000,1000),random(-1000,1000),random(-1000,1000));
  
  
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