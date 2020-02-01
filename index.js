
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
  res.render( 'game.html');
});

//socket
io.on('connection', (socket)=>{
	
	socket.on('disconnect', (arg)=>{

	
	})


});


server.listen(port, () => {
    
    console.log(`Example app listening on port ${port}!`)
    
})

