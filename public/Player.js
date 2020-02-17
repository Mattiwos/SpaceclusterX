class Player{
    constructor(ax,ay,ar,name){
      this.x=ax;
      this.y=ay;
      this.r=ar;
      
      this.name = name;
      //speed of rotation
      this.raccel=0;
      this.faccel=0;
      this.maxfs = 16;
      this.maxbs = 4;
      this.raccelspeed = 0.008;
      this.faccelspeed = 0.5;
      this.rocketfire =false;

      this.upgrades = [];
      this.storage = 5;
      this.cargobay = [];
      //cargo state in animation
      this.cargostate = [];

      this.credits = 20;
      this.displaycredits = 20;
      this.health = 100;
      this.ammo = 50;

      this.bulletSpeed=0;
      this.reload=2;
      this.bulletDamage=0;
  
    }
    movement(){
      ///rotation
      if(keyDown[keys[1]]==1){ //A
        if(this.raccel<this.raccelspeed*(9))
        this.raccel+=this.raccelspeed*d;
      }if(keyDown[keys[0]]==1){ //D
        if(this.raccel>this.raccelspeed*(-9)) 
        this.raccel-=this.raccelspeed*d;
      }
      this.r+=this.raccel;
      // <> console.log(this.raccel);
      if(this.raccel>0)this.raccel-=this.raccelspeed/2*d;
      if(this.raccel<0)this.raccel+=this.raccelspeed/2*d;
      if(abs(this.raccel)<this.raccelspeed/2*d)this.raccel=this.raccel/2;

      if(this.displaycredits>this.credits)this.displaycredits--;
      if(this.displaycredits<this.credits)this.displaycredits++;

      
      //forward and backward speeds
      if(keyDown[keys[2]]==1){
        this.rocketfire = true;
        if(this.faccel<this.faccelspeed*(this.maxfs))
        this.faccel+=this.faccelspeed*d;
      
      }
      else this.rocketfire = false;
      if(keyDown[keys[3]]==1){
        if(this.faccel>this.faccelspeed*(-1*this.maxbs))
        this.faccel-=this.faccelspeed*d;
      }
  
      this.x+=cos(this.r)*this.faccel*d;
      this.y+=sin(this.r)*this.faccel*d;
  
      if(this.faccel>0)this.faccel-=this.faccelspeed/4*d;
      if(this.faccel<0)this.faccel+=this.faccelspeed/4*d;
      if(dist(this.faccel,0,0,0)<this.faccelspeed/2*d)this.faccel=0;
      
      if(this.ammo<100){
        this.ammo+=this.reload/15;
      }

      //shooting

      if(keyDown[keys[4]]==1 &&this.ammo>20 && reloaded){
        this.ammo-=20;
        lasers.push(new Projectile(this.x,this.y,player.r),10+this.bulletDamage*3);
        reloaded=false;
      }
      
    }
    draw(){
      this.movement();
      
      drawSpaceship(width / 2, height /2 +m,this.r, this.rocketfire);

      // if (this.name === undefined){
      //   window.location.href = 'index.html';
      // }
      textSize(20);
      fill (255);
      noStroke();
      textAlign(CENTER);
      text(String(this.name), width / 2 +2, height /2 +m*2)

      //drawSpaceship(width / 2, height /2 ,this.r, this.rocketfire);
    }
  
  }
  
  