// let laserSound = new Audio('assets/laserSound1.mp3');



var gameseed;
var spectate = false;
var deathbanner = true;
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
  
      oplayers.splice(i,1)
      
      
    }

  }
})
var grounditems = [];

socket.on("updateLoc", (args)=>{
  
  var exists = false;
  
  for (var e = 0; e < args.currentplayers.length;e++){
   
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],
          args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6],args.currentplayers[e][7]
          ,args.currentplayers[e][8],args.currentplayers[e][9]);
        exists = true
        

      }
      if (args.currentplayers[e][0] == socket.id || args.currentplayers[e][0] == socket.id){
        exists = true
        args.currentplayers[e][5] = player.name
      }
      
    }
    if (exists == false){
      if (args.currentplayers[e][0] != socket.id)
      oplayers.push(new Oplayer(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],
        args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6],args.currentplayers[e][7]
        ,args.currentplayers[e][8],args.currentplayers[e][9]))
      
    }
    exists = false;
  }

  grounditems = args.grounditems;

}) 

socket.on('init', (args)=>{
  // gameseed = args.gameseed;
  gameseed = args.gameseed;
  
  
  var exists = false;


  for (var e = 0; e < args.currentplayers.length;e++){
    
    for (var i =0; i< oplayers.length;i++){
      if (oplayers[i].id == args.currentplayers[e][0] && args.currentplayers[e][0] != socket.id){
        

        oplayers[i].update(args.currentplayers[e][1],args.currentplayers[e][2],args.currentplayers[e][3],args.currentplayers[e][4],args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6],args.currentplayers[e][7]
          ,args.currentplayers[e][8],args.currentplayers[e][9]);

        exists = true
       

      }
      if (args.currentplayers[e][0] == socket.id){
        exists = true
        // args.currentplayers[e][5] = player.name
       
        
      }
      
    }
    if (exists == false){
      if (args.currentplayers[e][0] != socket.id) //double checking might not need
      oplayers.push(new Oplayer(0,0,0,true,args.currentplayers[e][0],args.currentplayers[e][5],args.currentplayers[e][6],args.currentplayers[e][7],args.currentplayers[e][8],args.currentplayers[e][9]))
    }
      
    exists = false;
    
    }
    
    // for (var i = 0; i < args.planets.length; i++){
    //   planets.push(new planet(args.planets[i][0],args.planets[i][1],args.planets[i][2], args.planets[i][3], args.planets[i][4], args.planets[i][5]))
    // }
    // for (var i = 0; i < args.stars.length; i++){
    //   stars.push(new star(args.stars[i][0],args.stars[i][1]));
    // }
    // for (var i = 0; i < args.city.length; i++){
    //   city.push(new hub(args.city[i][0],args.city[i][1],args.city[i][2],args.city[i][3],args.city[i][4]));
    // }

   
 
  

})

socket.on('mapUpdate',(args)=>{
  
})

function gunshoot(x,y,r,dmg,speed,id,pid = socket.id){
  if (spectate == false){


  
  socket.emit("pewpew",{
    x: x,
    y: y,
    r: r,
    dmg: dmg,
    bulletspeed: speed,
    playerid: pid,
  })
}

}
socket.on("playershootomgrunnn",(arg)=>{
  lasers.push(new Projectile(arg.x,arg.y,arg.r,arg.dmg,arg.bulletspeed,arg.id,arg.playerid));
});
function senddata(){
  if (spectate == false){

  
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

//alternate arrow keys
var keys2=[37,39,38,40];


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
var keyP=false;
var mouseP=false;
var diagonal = 0;
var mappy;
var seedgeneratedplanets =[];
var seedgeneratedstars =[];

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function setup() { //window.devicePixelRatio
  socket.emit('sendmedataprettyplease',{

  });
  createCanvas(windowWidth, windowHeight);
  player = (window.origin == "http://localhost:5500") ? new Player(0,0,random(-1000,1000),name,random(0,255),random(0,255),random(0,255)) :new Player(width/2+random(-1000,1000),height/2 + m+random(-1000,1000),random(-1000,1000),name,random(0,255),random(0,255),random(0,255));

  diagonal = dist(0,0,width/2,height/2);
  

  mappy = new Map();

  
  

  
  name = String(getCookie('username'))
  player.name = name;
  console.log(gameseed);
  if (gameseed != undefined){

    noiseSeed(gameseed);
    recalculateseedbasedobjects();
  }
  

  

}
//gameseed
var nosx =2;
var nosy =2;
var crater = [];
var prevx = 0;
var prevy = 0;
var numofloop = 0;

function spectatemode(){
  socket.emit('removeme',{
    id: socket.id
  })

  player.health = undefined
  spectate = true
  

  


}
function draw() {
  if (gameseed != undefined && numofloop == 0){
    noiseSeed(gameseed);
    numofloop+=1;
  
  }
 

  if (gameseed != undefined){
    
    
    
    
    if (dist(prevx,prevy,-player.x + width/2,-player.y + m + height /2) >= 500){
      recalculateseedbasedobjects();
      prevx = -player.x + width/2;
      prevy = -player.y + m + height /2;
     


    }

    sectorsize = 300
    seedgeneratedstars = [];
    chanceofappearingstar = .1;
    for (var x = player.x - width/2; x < player.x +width/2 + sectorsize*2; x+= sectorsize){
      basex = x//-player.x + x;
      basex = Math.floor(basex/sectorsize) * sectorsize;
      basey = 0
      if (noise(basex,basey,3) >= chanceofappearingstar){
        starspeed = noise(basex,basey,88) *2 + 5
        offx = noise(basex,basey,4) * sectorsize
        offy = noise(basex,basey,5)*sectorsize 

        seedgeneratedstars.push(new star(basex+offx,basey+offy,starspeed))
        
      }
      for (var y = player.y - height/2; y < player.y +height/2 + sectorsize*2; y+=sectorsize){
        basey = y//-player.y +y;
        basey = Math.floor(basey/sectorsize) * sectorsize;
        if (noise(basex,basey,3) >= chanceofappearingstar){
          starspeed = noise(basex,basey,88) *2 + 5
          offx = noise(basex,basey,4) * sectorsize
          offy = noise(basex,basey,5)*sectorsize 

          seedgeneratedstars.push(new star(basex+offx,basey+offy,starspeed))


        }
      }

    }
    
    //if(keyP>0)keyP--;


      

    


    d=deltaTime/10;
    background(0);
    

    
    

    senddata() 
    if (this.health <= 0 || player.name ==""){
      spectatemode()
    }
    
    
    for (var i = 0; i <seedgeneratedstars.length;i++){
      seedgeneratedstars[i].draw()
      //noiseDetail()
    }
    for (var i = 0; i <seedgeneratedplanets.length;i++){
      seedgeneratedplanets[i].draw()
      //noiseDetail()
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
    

    //push()
    

  for (var i =0; i < grounditems.length; i++){
    push()
    translate(-player.x + width/2,-player.y + m + height /2)
    
    //ellipse(grounditems[i][0],grounditems[i][1],20,20) 
    drawCredit(grounditems[i][0],grounditems[i][1], 3)

    if (spectate == false){
    if (dist(player.x,player.y,grounditems[i][0],grounditems[i][1] ) <= 30 ){
      player.credits += (grounditems[i][2])/2; //divided by two because it was
      //giving twice as much credits


      socket.emit('recovedgrounditems',{
        x:grounditems[i][0],
        y:grounditems[i][1],
        credits:grounditems[i][2],
      }) 
      grounditems.splice(i,1)
      


    }
  }

   

    

    pop ();
  }
    

    player.draw();

    drawGraphics();

    mappy.drawMap();
    mappy.drawWorldMap();

    drawLeaderBoard(oplayers);

  }
  if (spectate == true){

    push()
    fill (255,0,0)
    if (deathbanner){
      
      textFont('Georgia');
      textSize(width / 5);
      textAlign(CENTER, CENTER);
      text ("Your Died", width/2,height/2) 

    }
    

    rectMode(CENTER); 
    rect(width/2,height/2 + height/6,140,40,20);

    textSize(width / 35);
    textAlign(CENTER);
    fill(0)
    text ("Play Again", width/2,height/2 + height/6) 


    fill (255,0,0)
    rectMode(CENTER); 
    rect(width/2,height/2 + height/4,140,40,20);

    textSize(width / 35);
    textAlign(CENTER);
    fill(0)
    text ("Go Home", width/2,height/2 + height/4) 

    fill (255,0,0)
    rectMode(CENTER); 
    rect(width/2,height/2 + height/6 + height/6,140,40,20);

    textSize(width / 35);
    textAlign(CENTER);
    fill(0)
    text ("Spectate", width/2,height/2 + height/6+ height/6) 


    // rect(30, 20, 55, 55, 20);

  pop ()

  }
  

}

function keyPressed(){
  keyDown[keyCode]=1;
}
function keyReleased(){
  keyDown[keyCode]=0;
  reloaded=true;
}
function mousePressed(){

  if (spectate == true){
    if (abs(mouseX -width/2 ) < 70 && abs(mouseY - (height/2 + height/6) ) < 20){
      location.reload();
    }

    if (abs(mouseX -width/2 ) < 70 && abs(mouseY - (height/2 + height/4) ) < 20){
      location.href = "/index.html"
    }
  
    if (abs(mouseX -width/2 ) < 70 && abs(mouseY - (height/2 + height/6+ height/6) ) < 20){
      deathbanner= false;
    }
   
}


}
function mouseReleased(){
  mouseP=false;
}

function distance(x,y,xs,ys){
  return(Math.pow(Math.pow(Math.abs(xs-x),2)+Math.pow(Math.abs(ys-y),2),0.5));
}


function recalculateseedbasedobjects(){
 
  sectorsize = 700
  seedgeneratedplanets = [];
  chanceofappearing = .4;

  worldsize=6000;
  
  
  for (var x = player.x - width/2; x < player.x +width/2 + sectorsize*2; x+= sectorsize){
    basex = x//-player.x + x;
    basex = Math.floor(basex/sectorsize) * sectorsize;
    basey = 0
    //makes boundary
    //print(distance(player.x,player.y,0,0));
    //if(distance(basex +offx,basey+offy,0,0)<5000) if(distance(player.x,player.y,0,0)<5000)
    if (noise(basex,basey,3) >= 1-chanceofappearing){
      pedrand = noise(basex,basey,4) *700
      pedr = noise(basex,basey,5) *255
      pedg = noise(basex,basey,6) *255
      pedb = noise(basex,basey,7) *255
      offx = noise(basex,basey,8) *200
      offy = noise(basex,basey,9) *200
      
      crater = [];

      craternumber = Math.round(noise(basex,basey,10) *10)

        
        
      for(var o=0;o<craternumber;o++){
            // the first one in the array is x, y, fill

          ag = noise(basex,basey,1+o) *2*PI
          cratersz = noise(basex,basey,2+o) *40 +10
          dists = noise(basex,basey,3+o) * (pedrand-cratersz) /2 // 
          craterfill = noise(basex,basey,4+o) * 255
           //console.log(`${pedrand} amd ${cratersz} = ${dists}`)
           crater.push ([ag, dists , cratersz , craterfill]);
            
        }
        
        if(distance(basex +offx,basey+offy,0,0)<worldsize) 
        seedgeneratedplanets.push(new planet(basex + offx,basey + offy,pedrand,pedr,pedg,pedb, crater))
    
        
    }
   
    
    for (var y = player.y - height/2; y < player.y +height/2 + sectorsize*2; y+=sectorsize){
      basey = y//-player.y +y;
      basey = Math.floor(basey/sectorsize) * sectorsize;
      if (noise(basex,basey,3) >= 1-chanceofappearing){
        pedrand = noise(basex,basey,4) *700

        pedr = noise(basex,basey,5) *255
        pedg = noise(basex,basey,6) *255
        pedb = noise(basex,basey,7) *255
        offx = noise(basex,basey,8) *200
        offy = noise(basex,basey,9) *200
        

        crater = [];

        craternumber = Math.round(noise(basex,basey,10) *10)      
        for(var o=0;o<craternumber;o++){
            // the first one in the array is x, y, fill

            ag = noise(basex,basey,1+o) *2*PI
            cratersz = noise(basex,basey,2+o) *40 +10
            dists = noise(basex,basey,3+o) * (pedrand + cratersz) /2// 
            dists = noise(basex,basey,3+o) * (pedrand + cratersz) /2// 
            craterfill = noise(basex,basey,4+o) * 255  //opasity?  
            crater.push ([ag, dists , cratersz , craterfill]);         
        }
        if(distance(basex +offx,basey+offy,0,0)<worldsize)  
        seedgeneratedplanets.push(new planet(basex + offx,basey + offy,pedrand,pedr,pedg,pedb, crater))
        
      }


    }
    

    }


}


