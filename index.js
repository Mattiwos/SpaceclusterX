
const express  = require('express')
const port = process.env.PORT || 5500

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
//required folders

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('assets'));

//renders index.html
app.get('/', function(req, res){
  res.render( 'index.html');
});

playerson = [];
//socket
io.on('connection', (socket)=>{
  playerson.push([socket.id]);

  socket.emit('init', {
    currentplayers: playerson

  })
  socket.on('currData', (args)=>{
    for (var i = 0; i < playerson.length;i++){
      if (playerson[i][0] == args.id){
        playerson[i].push(args.x);
        playerson[i].push(args.y);
        playerson[i].push(args.r);
        playerson[i].push(args.rocketfire);
        updateLoc();
        break;
      }
    }
   

  })
  function updateLoc(){
    socket.emit('updateLoc',(data)=>{
      currentplayers = playerson;
    })
  }
	
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


server.listen(port, () => {
    
    console.log(`Example app listening on port ${port}!`)
    
})

