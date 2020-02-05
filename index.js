var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 5500;

//required folders


app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('assets'));

//renders index.html
app.get('/', function(req, res){
  res.render( 'index.html');
});

playerson = [];
planets = [];
newplanets(10);

stars = [];
newstars(100);

//socket
io.on('connection', (socket)=>{
  playerson.push([socket.id]);

  socket.emit('init', {
    currentplayers: playerson,
    planets: planets,
    stars: stars

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
	
	})


});

function updateLoc(){
  io.emit('updateLoc',{
    currentplayers: playerson
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
      cx=getRandomInt(-1000,1000);
      cy=getRandomInt(-1000,1000);
      cs=getRandomInt(200,500);

      spawn=true;
      for(var j=0;j<planets.length;j++){
        if( ( Math.sqrt( (Math.pow(cx - planets[j][0],2) + Math.pow(cy - planets[j][1],2)) )  )< cs+planets[j][2])spawn=false;
      }
    }
    cr = (Math.random() * 255) | 0
    cg = (Math.random() * 255) | 0
    cb = (Math.random() * 255) | 0
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
    stars.push([getRandomInt(-1000,1000),getRandomInt(-1000,1000)]);
  }

}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
