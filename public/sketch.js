const socket = io(
  {transports: ['websocket']},
  { forceNew: true }
  );
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});

socket.on("updateLoc", (args)=>{
  
  var exists = false;
  
  for (var e = 0; e < args.currentplayers.length;e++){
   
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5]);
        exists = true
        

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
        player.name = args.currentplayers[e][5]
      }
      
    }
    if (exists == false){
      oplayers.push(new Oplayer(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5]))
     
    }
    exists = false;
  }

}) 

socket.on('init', (args)=>{
 
  var exists = false;

  for (var e = 0; e < args.currentplayers.length;e++){
    
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5]);

        exists = true
       

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
        player.name = args.currentplayers[e][5]
      }
      
    }
    if (exists == false){
      oplayers.push(new Oplayer(0,0,0,true,args.currentplayers[e][0],args.currentplayers[e][5]))
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
function gunshoot(x,y,r,dmg,id,pid = socket.id){

  socket.emit("pewpew",{
    x: x,
    y: y,
    r: r,
    dmg: dmg,
    playerid: pid,
  })

}
socket.on("playershootomgrunnn",(arg)=>{
  lasers.push(new Projectile(arg.x,arg.y,arg.r,arg.dmg,arg.id,arg.playerid));
});
function sendata(){
  socket.emit("currData",{	  
   
    id: socket.id,	
    x: player.x,	
    y: player.y,	
    r: player.r,	
    rocketfire: player.rocketfire,	
    name: player.name,	
  })
}
///////////////////////////////////////////Socket ^ ////////////////////////////////////////////////////////////////////////////////////////////////////////

window.oncontextmenu = function () {
  return false;
}
document.onkeydown = function (e) { 
   if (window.event.keyCode == 123 ||  e.button==2)    
   return false;
}

var keyDown={};
var keys=[65,68,87,83,32];


var oplayers = [];
var player;
var planets=[];
var stars=[];
var lasers=[];

var reloaded;

var d;

//used for a while loop
var z;

var m=-50;
//how much the ship is moved down from the center

var storagewidth = 50;
//constant: how big the resources appear in the queue


//constant : how many resources ther eare
var numOfResources=6;



//constant how spaced the upgrades
var modificationSpacing=50;

// what are the different upgrades

upgradeName=["Reload","Laser Speed","Damage"];

upgradeCost=[10,10,10];

upgradeResources=[[2,3],[1,2],[4,5]];

numOfResourcesUpgrade=[2,2,2];



//Other players

var mouseP=false;
var diagonal = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width/2+random(-1000,1000),height/2 + m+random(-1000,1000),random(-1000,1000),"unknown");
  diagonal = dist(0,0,width/2,height/2);
  
}

function draw() {
  d=deltaTime/10;
  background(0);
  sendata() 
  
  //print("as;dlfkj");
  //draw objects close by only in orde to increase performance

  
  for(var i =0;i<stars.length;i++){
   
 //     if(stars[i].x+width/2>player.x-width/2-stars[i].s/2
  //      && stars[i].x+width/2<player.x+width/2+stars[i].s/2
  //      && stars[i].y+height/2>player.y-height/2-stars[i].s/2
  //      && stars[i].y+height/2<player.y+height/2+stars[i].s/2)
  //      stars[i].draw();
    

        //if( (dist(player.x,stars[i].x,player.y,stars[i].y)<diagonal))
  //   if ( (dist(player.x,stars[i].x,player.y,stars[i].y)) <= (2*width)){

   // if( (dist(player.x,player.y,stars[i].x,stars[i].y)/4<diagonal+stars[i].s/2))
    stars[i].draw();
//   }
      //stars[i].draw();
   //  }


   // stars[i].draw();

   
  }
 


  for(var i =0;i<planets.length;i++){
    
    // if ( (dist(player.x,planets[i].x,player.y,planets[i].y)) <= (2*width)){
     // if( (dist(player.x,player.y,planets[i].x,planets[i].y)<diagonal+planets[i].s/2))
       planets[i].draw();
  //   }
    //planets[i].draw();
   
  }

  for(var i =0;i<lasers.length;i++){
    
   // if( (dist(player.x,player.y,lasers[i].x,lasers[i].y)<diagonal+lasers[i].size))
     //if ( (dist(player.x,lasers[i].x,player.y,lasers[i].y)) <= (2*width)){
       //lasers[i].draw();
    // }
    lasers[i].draw();
   
  }
  z=0;
  while(z<lasers.length){
    if(lasers[z].lifespan<0){
      lasers.splice(z,1);
      z=0;
    }
    z++;
  }
  
  for(var i =0;i<oplayers.length;i++){
    
    // if ( (dist(player.x,player.y,oplayers[i].x,oplayers[i].y))  <diagonal+40){
      oplayers[i].draw();
     //}
    //oplayers[i].draw();
    
  }

  

  player.draw();

  drawGraphics();

}

function keyPressed(){
  keyDown[keyCode]=1;
}
function keyReleased(){
  keyDown[keyCode]=0;
  reloaded=true;
}
function mousePressed(){
  //mouseP=true;
}
function mouseReleased(){
  mouseP=false;
}


