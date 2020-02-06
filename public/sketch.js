///////////////////////////////Don't Delete///////////////////////////////////////////////////
//For website use

const socket = io(
  {transports: ['websocket']},
  { forceNew: true }
  );

// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});
//Test Use

// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
//var socket = io();
// socket.on('reconnect_attempt', () => {
//   socket.io.opts.transports = ['polling', 'websocket'];
// });

// var socket = io.connect(window.location.origin); //starts connection with website (server)
//const socket = io(window.location.origin);

//var socket = io();
//var socket = io();

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
/////////////////////////////////////////////////


var keyDown={};
var keys=[65,68,87,83,32];


var oplayers = [];
var player;
var planets=[];
var stars=[];

var d;

var m=-50;
//how much the ship is moved down from the center

var storagewidth = 50;
//constant: how big the resources appear in the queue

//Other players



function setup() {
  createCanvas(1000, 700);
  

  player = new Player(random(-1000,1000),random(-1000,1000),random(-1000,1000));
  
  
}

function draw() {
  d=deltaTime/10;
  background(0);
  senddata(); 
  
  //print("as;dlfkj");
  //draw objects close by only in orde to increase performance
  

  for(var i =0;i<stars.length;i++){
   
    // if ( (dist(player.x,stars[i].x,player.y,stars[i].y)) <= (2*width)){
    //   stars[i].draw();
    // }
    stars[i].draw();

   
  }
 


  for(var i =0;i<planets.length;i++){
    
    // if ( (dist(player.x,planets[i].x,player.y,planets[i].y)) <= (2*width)){
    //   planets[i].draw();
    // }
    planets[i].draw();
   
  }
  
  for(var i =0;i<oplayers.length;i++){
    
    // if ( (dist(player.x,oplayers[i].x,player.y,oplayers[i].y)) <= (2*width)){
    //   oplayers[i].draw();
    // }
    oplayers[i].draw();
    
  }

  player.draw();

  drawGraphics();


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



//////////////////////////////////////////////////////////////////////////////////