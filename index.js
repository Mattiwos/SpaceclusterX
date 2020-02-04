
const express  = require('express')
const port = process.env.PORT || 5500

var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
//required folders
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

const statusMonitor = require('express-status-monitor')();
app.use(statusMonitor);
app.get('/status', ensureLoggedIn, statusMonitor.pageRoute)

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


server.listen(port, () => {
    
    console.log(`Example app listening on port ${port}!`)
    
})

