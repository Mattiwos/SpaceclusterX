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
var city = [];
newplanets(12);

stars = [];
var name = [];
newstars(100);
//heroku logs --tail -a spaceclusterx
//socket
var gameseed = Math.random();



io.on('connection', (socket)=>{
  name.push([socket.id]);
  console.log(name);

  
  socket.emit('init', {
    currentplayers: playerson,
    planets: planets,
    city: city,
    stars: stars,
    lasers: lasers,
    gameseed: gameseed
    

  })
  socket.on('currData', (args)=>{
    
    for (var i = 0; i < playerson.length;i++){
      if (playerson[i][0] == args.id){
        playerson[i][1] = (args.x);
        playerson[i][2] = (args.y);
        playerson[i][3] = (args.r);
        playerson[i][4] = args.rocketfire;
        playerson[i][5] = args.name;
       
        console.log("reviedev data to currdat")
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
      id: socket.id
    })
    updateLoc()
	})


});

function updateLoc(){
  console.log("recieved data");
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
        city.push(createHub(cx,cy,cs));
     }
  }
  //creates the contracts
  for(var i=0;i<10;i++){
    console.log("city"+city[getRandomInt(0,city.length)]);
    city[getRandomInt(0,city.length)].createContract();
  }

}

//createHub(this.x,this.y,this.s);

function createHub(x,y,s){
  // 
        

        

       
            // now it will create the x , y of the hub(s)

          touching=true;
          
          while(touching==true){
              ag=random(0,2*PI);
              dist=random(0,s/2);
              touching=false;

              for(let p=0;p<city.length;p++){
                console.log(city[p]);

                  // change from distance to sqrt pythagoram theorm
                  if(
                      Math.sqrt(Math.pow(city[p][0]-(x+dist*cos(ag)),2)+Math.pow(city[p][1]-(y+dist*sin(ag)),2))
                      
                      <citysize*2){
                      touching=true;
                  }
                  // old distance dist(x+dist*cos(ag),y+dist*sin(ag),city[p].x,city[p].y)
              }
          }
          
          newx=x+dist*cos(ag);
          newy=y+dist*sin(ag);
          //next it will add the upgrades that are available

          upgrades=[];
          numOfUpgrades=getRandomInt(0,2);
          if(random(0,10)<2)numOfUpgrades=2;
          //upgradeCost=[];
          cityUpgradeResources=[];

          
          for(let q=0;q<numOfUpgrades;q++){
            cityUpgradeResources.push([]);

              upgrade = getRandomInt(0,upgradeName.length-1);
              console.log("upgrade name"+upgradeName.length);
              exists=true;
              
              while(exists==true){
                      upgrade = getRandomInt(0,upgradeName.length-1);
                      exists=false;
                      for(let j=0;j<upgrades.length;j++){
                          if(upgrades[j]==upgrade)exists=true;
                      }
              }
              
             // upgradeCost.push(upgradeCost[upgrade]);
              for(let u=0;u<numOfResourcesUpgrade[upgrade];u++){
                console.log(upgradeResources);

                cityUpgradeResources[cityUpgradeResources.length-1].push
                  (upgradeResources[upgrade][ getRandomInt(0,upgradeResources[upgrade].length)  ]   );
              }
              
              upgrades.push(upgrade);
          }
          
            //// create the little circle graphics

            ///// >
            //////(!) for now they aren't the same

            return [newx,newy,planetExport,upgrades,cityUpgradeResources];

            ////end loop for creating one hub
        
        /// condenses the imformation into the output


        /////here are all of the variables:

        // hubx , huby , EXPORT[array] , UPGRADES[array] ,upgradeResources[array]

        // note that: currently the IMPORTS (contracts) are not included, they will be added somewhere else
        // there will be a function that adds a contract to a random planet, in the constructor they don't get any


 //
    //if this thiasdlkasdlsf = 0
  //  return [[1,2,3],[1231,123],'1']
    
  //  return [[1,2,3],[1231,123]]

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
