class Player{
    constructor(ax,ay,ar){
      this.x=ax;
      this.y=ay;
      this.r=ar;
      //speed of rotation
      this.raccel=0;
      this.faccel=0;
      this.maxfs = 12;
      this.maxbs = 1;
      this.raccelspeed = 0.008;
      this.rocketfire =false;
  
    }
    movement(){
      
    }
    draw(){
      
  
  
      
     
      ///rotation
      if(keyDown[keys[1]]==1){ //A
        if(this.raccel<this.raccelspeed*(8))
        this.raccel+=this.raccelspeed*d;
      }if(keyDown[keys[0]]==1){ //D
        if(this.raccel>this.raccelspeed*(-8)) 
        this.raccel-=this.raccelspeed*d;
      }
      this.r+=this.raccel;
      console.log(this.raccel);
      if(this.raccel>0)this.raccel-=this.raccelspeed/2*d;
      if(this.raccel<0)this.raccel+=this.raccelspeed/2*d;
      if(abs(this.raccel)<this.raccelspeed/2)this.raccel=this.raccel/2;
      //forward and backword speeds
      if(keyDown[keys[2]]==1){
        this.rocketfire = true;
        if(this.faccel<faccelspeed*(this.maxfs))
        this.faccel+=faccelspeed*d;
      
      }
      else this.rocketfire = false;
      if(keyDown[keys[3]]==1){
        if(this.faccel>faccelspeed*(-1*this.maxbs))
        this.faccel-=faccelspeed*d;
      }
  
      this.x+=cos(this.r)*this.faccel*d;
      this.y+=sin(this.r)*this.faccel*d;
  
      if(this.faccel>0)this.faccel-=faccelspeed/4*d;
      if(this.faccel<0)this.faccel+=faccelspeed/4*d;
      if(dist(this.faccel,0,0,0)<faccelspeed/2)this.faccel=0;
  
  
      drawSpaceship(width / 2, height /2 ,this.r, this.rocketfire);
    }
  
  }
  
  function keyPressed(){
    keyDown[keyCode]=1;
  }
  function keyReleased(){
    keyDown[keyCode]=0;
  }