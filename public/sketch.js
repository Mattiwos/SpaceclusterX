

var gameseed = 0;
const socket = io(
  {transports: ['websocket']},
  { forceNew: true }
  );
socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});
socket.on('deleteplayer',(arg)=>{
  for (var i = 0; i < oplayers.length;i++){
    if (arg.id == oplayers[i].id){
      print(`removing ${oplayers.id} from list to draw`)
      oplayers.slice(i,1)
      
      
    }
  }
})


socket.on("updateLoc", (args)=>{
  
  var exists = false;
  
  for (var e = 0; e < args.currentplayers.length;e++){
   
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6]);
        exists = true
        

      }
      if (args.currentplayers[e][0] == socket.id || args.currentplayers[e][0] == player.id){
        exists = true
        args.currentplayers[e][5] = player.name
      }
      
    }
    if (exists == false){
      oplayers.push(new Oplayer(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6]))
      
    }
    exists = false;
  }

}) 

socket.on('init', (args)=>{
  var gameseed = args.gameseed;
  
  var exists = false;


  for (var e = 0; e < args.currentplayers.length;e++){
    
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        console.log(args.currentplayers[e][6])

        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6]);

        exists = true
       

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
        // args.currentplayers[e][5] = player.name
       
        
      }
      
    }
    if (exists == false){
      
      oplayers.push(new Oplayer(0,0,0,true,args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6]))
    }
      
    exists = false;
    
    }
    
    for (var i = 0; i < args.planets.length; i++){
      planets.push(new planet(args.planets[i][0],args.planets[i][1],args.planets[i][2], args.planets[i][3], args.planets[i][4], args.planets[i][5]))
    }
    for (var i = 0; i < args.stars.length; i++){
      stars.push(new star(args.stars[i][0],args.stars[i][1]));
    }
    for (var i = 0; i < args.city.length; i++){
      city.push(new hub(args.city[i][0],args.city[i][1],args.city[i][2],args.city[i][3],args.city[i][4]));
    }

   
 
  

})

socket.on('mapUpdate',(args)=>{
  
})
function gunshoot(x,y,r,dmg,speed,id,pid = socket.id){

  socket.emit("pewpew",{
    x: x,
    y: y,
    r: r,
    dmg: dmg,
    bulletspeed: speed,
    playerid: pid,
  })

}
socket.on("playershootomgrunnn",(arg)=>{
  lasers.push(new Projectile(arg.x,arg.y,arg.r,arg.dmg,arg.bulletspeed,arg.id,arg.playerid));
});
function senddata(){
  socket.emit("currData",{	  
   
    id: socket.id,	
    x: player.x,	
    y: player.y,	
    r: player.r,	
    rocketfire: player.rocketfire,	
    name: player.name,
    credit: player.credits,
   
  });
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

var city=[];

var reloaded;

var d;

//used for a while loop
var z;









//Other players

var mouseP=false;
var diagonal = 0;

var seedgeneratedplanets =[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = (window.origin == "http://localhost:5500") ? new Player(0,0,random(-1000,1000),name) :new Player(width/2+random(-1000,1000),height/2 + m+random(-1000,1000),random(-1000,1000),name);

  diagonal = dist(0,0,width/2,height/2);
  socket.emit('send me data pretty please',{

  });

  noiseSeed(gameseed);
  console.log(window.location.search);

  var urlParams = new URLSearchParams(window.location.search);
  name  = urlParams.getAll('name') || null;
  player.name = name;
}
//gameseed
var nosx =2;
var nosy =2;


function draw() {
  
  
  sectorsize = 20
  seedgeneratedplanets = [];
  chanceofappearing = .2;
  
  console.log(`Star:${-1*(-player.y+height)} and end: ${-1*(-player.y+height)}`);
  for (var x = (-player.x + width/2)*-1; x < (-player.x - width/2)*-1; x+= sectorsize){
    basex = x//-player.x + x;
    basex = Math.floor(basex/sectorsize) * sectorsize;
    basey = 0
    if (noise(basex,basey,3) >= 1-chanceofappearing){
      pedrand = noise(basex,basey,4) *20
      pedr = noise(basex,basey,5) *255
      pedg = noise(basex,basey,6) *255
      pedb = noise(basex,basey,7) *255
      seedgeneratedplanets.push(new planet(basex,basey,pedrand, pedr,pedg,pedb))
    }

    for (var y = -2*(-player.y+height/2); y < -2*(-player.y -height/2); y+=sectorsize){
      basey = y//-player.y +y;
      basey = Math.floor(basey/sectorsize) * sectorsize;
      if (noise(basex,basey,3) >= 1-chanceofappearing){
        pedrand = noise(basex,basey,4) *20

        pedr = noise(basex,basey,5) *255
        pedg = noise(basex,basey,6) *255
        pedb = noise(basex,basey,7) *255
        offx = Math.random() *noise(basex,basey,8) *500
        offy = Math.random() *noise(basex,basey,9) *500
        push ()
        
        seedgeneratedplanets.push(new planet(basex,basey,pedrand,pedr,pedg,pedb))
        pop ()
      }
    }
    

    }

  


  d=deltaTime/10;
  background(0);
  

  for (var i = 0; i <seedgeneratedplanets.length;i++){
    
    seedgeneratedplanets[i].draw()
 
    //noiseDetail()
  }
  

  senddata() 
  if (player.health <= 0 || player.name ==""){
    window.location.href = 'index.html';
  }
  
  
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
      //  planets[i].draw();
  //   }
    planets[i].draw();
   
  }
  textSize(30);
       fill (255);
       noStroke();
       textAlign(RIGHT);
  
       text("X: " +round(-player.x + width/2) + "Y: " + round(-player.y), width, height/2) //left
       
       text("X: " +round(-player.x) + "Y: " + round(-player.y+height), width/2, height-10) // bottom

       text("X: " +round(-player.x) + "Y: " + round(-player.y +height/2), width/2, 0+12) //top

       text("X: " +round(-player.x - width/2) + "Y: " + round(-player.y), 100, height/2) //right
       fill (255);
       translate(player.x,player.y)
       //rect (-player.x + width/2,-player.y,400,400);

       pop()

  for(var i =0;i<city.length;i++){
    
    
    // if ( (dist(player.x,planets[i].x,player.y,planets[i].y)) <= (2*width)){
     // if( (dist(player.x,player.y,planets[i].x,planets[i].y)<diagonal+planets[i].s/2))
       city[i].draw();
       city[i].drawGraphics();
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
    if(lasers[z].lifespan <= 0){
      lasers.splice(z,1);
      z--
    }
    z++;
  }
  
  for(var i =0;i<oplayers.length;i++){
    // if ( (dist(player.x,player.y,oplayers[i].x,oplayers[i].y))  <diagonal+40){
      oplayers[i].draw();
     //}
    //oplayers[i].draw();
  }

  push()
  


  

  player.draw();

  drawGraphics();

  drawLeaderBoard(oplayers);

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


