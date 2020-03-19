var express = require('express');
var app = express();
const port = process.env.PORT || 5500;
var server = app.listen(port)
//var http = require('http').Server(app);
var io = require('socket.io').listen(server);

var {m, storagewidth, numOfResources, modificationSpacing ,upgradeResources ,numOfResourcesUpgrade, citysize,upgradeName} = require("./public/constants")

var PI = Math.PI
var cos = Math.cos
var sin = Math.sin

var city=[];

//security
var helmet = require('helmet');
//logger
var morgen = require('morgan');

app.use(helmet());
app.use(morgen('common'))

//required folders

app.use(express.static('assets'));
app.use(express.static('public'));
app.use(express.static('views'));
var grounditems = []

//renders index.html
app.get('/', (req, res)=>{
  res.render( 'index.html');
});

//error handling
app.use((req,res,next)=>{
  const error = new Error('The game is not here. Try ${port}')
  res.status(404)
  next(error)
});
app.use((error,req,res,next)=>{
  const statusCode = res.statusCode ==200 ? 500: res.statusCode
  res.status(statusCode)
  
  res.json({
    message: error.message,
    //if in production mode show pancake otherwise stack 
    stack: process.env.NODE_ENV === 'production' ? ':3' : error.stack,
  })

});

var playerson = [];
var lasers = [];
var planets = [];
var city = [];
newplanets(12);

stars = [];
var name = [];
newstars(100);
//heroku logs --tail -a spaceclusterx
//socket
var gameseed = Math.random();
console.log(gameseed)


io.on('connection', (socket)=>{
  playerson.push([socket.id,0,0,0,0,0,0]);
  name.push([socket.id]);
  

  socket.on('sendmedataprettyplease',(arg) =>{
    socket.emit('init', {
      currentplayers: playerson,
      planets: planets,
      city: city,
      stars: stars,
      lasers: lasers,
      gameseed: gameseed
      
  
    });

  });
  socket.emit('init', {
    currentplayers: playerson,
    planets: planets,
    city: city,
    stars: stars,
    lasers: lasers,
    gameseed: gameseed
    

  });
  

  socket.on('currData', (args)=>{
    
    for (var i = 0; i < playerson.length;i++){
      if (playerson[i][0] == args.id){
        playerson[i][1] = (args.x);
        playerson[i][2] = (args.y);
        playerson[i][3] = (args.r);
        playerson[i][4] = args.rocketfire;
        playerson[i][5] = args.name;
        playerson[i][6] = args.credit;
       
        
        
        updateLoc();
        break;
      }
  
      
    }
   

  })
  socket.on('pewpew',(arg)=>{
    socket.broadcast.emit("playershootomgrunnn",arg);
  })
  socket.on('recovedgrounditems',(arg)=>{
    for (var i = 0; i < grounditems.length;i++){
      if (arg.x == grounditems[i][0] && arg.y == grounditems[i][1]&&arg.credits == grounditems[i][2]){
        grounditems.splice(i,1);
      }
    }
  })

	socket.on('removeme',(arg)=>{
    for (var i = 0; i< playerson.length;i++){
      if (arg.id == playerson[i][0]){
        grounditems.push([playerson[i][1],playerson[i][2], playerson[i][6]])
        playerson.splice(i,1);
        io.emit('deleteplayer',{
          id: socket.id
        })
        updateLoc()
        break;
      }

    }

  })
	socket.on('disconnect', (arg)=>{
    for (var i = 0; i< playerson.length;i++){
      if (socket.id == playerson[i][0]){
        if (playerson[i][6] != undefined && playerson[i][6] != 0)
        grounditems.push([playerson[i][1],playerson[i][2], playerson[i][6]])
        playerson.splice(i,1);

        

        io.emit('deleteplayer',{
          id: socket.id
        })
        updateLoc()
        break;

      } 
    }
    
	})


});

function updateLoc(){
  
  io.emit('updateLoc',{
    currentplayers: playerson,
    lasers: lasers,
    grounditems:grounditems,
   
    
  })
}
function updateMap(){
  io.emit('mapUpdate',{

  })
}




function newplanets(n){

  for(var i=0;i<n;i++){
    spawn=false;
    while(spawn==false){
      cx=getRandomInt(-1400,1400);
      cy=getRandomInt(-1400,1400);
      cs=getRandomInt(200,500);

      spawn=true;
      for(var j=0;j<planets.length;j++){
        if( ( Math.sqrt( (Math.pow(cx - planets[j][0],2) + Math.pow(cy - planets[j][1],2)) )  )< cs+planets[j][2])spawn=false;
      }
    }
    cr = (Math.random() * 255) | 0
    cg = (Math.random() * 255) | 0
    cb = (Math.random() * 255) | 0
    

    
    
    // planets.push([cx,cy,cs,cr,cg,cb,createHub(cx,cy,cs)]);
    planets.push([cx,cy,cs,cr,cg,cb]);

    // creates the hubs on that planet
    //creates the resources

    planetExport=[];
    planetResources=getRandomInt(1,3);
    //cfreates the planets natural resources that it sells on the citys
    for(let k=0;k<planetResources;k++){
        possible=getRandomInt(1,numOfResources+1);
        exists=true;
        while(exists==true){
            possible=getRandomInt(1,numOfResources+1);
            exists=false;
            for(let h=0;h<planetExport.length;h++){
                if(possible==planetExport[h])exists=true;
            }
        }
        planetExport.push(possible);
    }


     hubnumber = getRandomInt(1,3);
     for(var a=0;a<hubnumber;a++){
        //city.push(createHub(cx,cy,cs));
     }
  }
  //creates the contracts
  for(var i=0;i<10;i++){
   
    //city[getRandomInt(0,city.length)].createContract();
  }

}





function random(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function newstars(n){
  for(var i=0;i<n;i++){
    stars.push([getRandomInt(-1400,1400),getRandomInt(-1400,1400)]);
  }

}

// http.listen(port, function(){
//   console.log('listening on *:' + port);
// });
