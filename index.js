var express = require('express');
var app = express();
const port = process.env.PORT || 5500;
var server = app.listen(port)
//var http = require('http').Server(app);
var io = require('socket.io').listen(server);

//security
var helmet = require('helmet');
//logger
var morgen = require('morgan');

app.use(helmet());
app.use(morgen('common'))

//required folders


app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('assets'));

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
newplanets(12);

stars = [];
newstars(100);
//heroku logs --tail -a spaceclusterx
//socket
io.on('connection', (socket)=>{
  playerson.push([socket.id]);
  socket.on('name', (arg)=>{

    for (var i = 0; i < playerson.length;i++){
      if (playerson[i][0] == socket.id){
        playerson[i][5] = arg.name;
        updateLoc();
        break;
      }
    }
    console.log(arg.name);
    socket.emit("whatsmyname",{
      name: arg.name
    });

  });
  socket.emit('init', {
    currentplayers: playerson,
    planets: planets,
    stars: stars,
    lasers: lasers
    

  })
  socket.on('currData', (args)=>{
    for (var i = 0; i < playerson.length;i++){
      if (playerson[i][0] == args.id){
        playerson[i][1] = (args.x);
        playerson[i][2] = (args.y);
        playerson[i][3] = (args.r);
        playerson[i][4] = args.rocketfire;
        updateLoc();
        break;
      }
    }
   

  })
  socket.on('pewpew',(arg)=>{
    socket.broadcast.emit("playershootomgrunnn",arg);
  })

	
	socket.on('disconnect', (arg)=>{
    for (var i = 0; i< playerson.length;i++){
      if (socket.id == playerson[i][0]){
        playerson.splice(i,1);
        break;
      } 
    }
    socket.emit('init', {
      currentplayers: playerson
  
    })
    io.emit('deleteplayer',{
      name: socket.id
    })
    updateLoc()
	})


});

function updateLoc(){
  io.emit('updateLoc',{
    currentplayers: playerson,
    lasers: lasers,
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
  }

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
