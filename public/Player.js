class Player{
    constructor(ax,ay,ar,name){
      this.x=ax;
      this.y=ay;
      this.r=ar;
      
      this.name = name;
      //speed of rotation
      this.raccel=0;
      this.faccel=0;
      this.maxfs = 15;
      this.maxbs = 4;
      this.raccelspeed = 0.007;
      this.faccelspeed = 0.4;
      this.rocketfire =false;

      this.upgrades = [];
      this.storage = 5;
      this.cargobay = [];
      //cargo state in animation
      this.cargostate = [];

      this.credits = 20;
      this.displaycredits = 20;
      this.health = 100;
      this.ammo = 0;

      this.bulletSpeed=0;
      this.reload=0;
      this.bulletDamage=0;

      this.damageTimer=0;
      this.damageTimertime=40;
    }
    movement(){
      if(player.damageTimer>0){
        player.damageTimer-=2;
        stroke(255,0,0);
        noFill();
        strokeWeight(10);
        ellipse(width/2,height/2+m,(this.damageTimertime-this.damageTimer)*(width+height/2)/this.damageTimertime,
        (this.damageTimertime-this.damageTimer)*(width+height/2)/this.damageTimertime);
      }
      if (this.health <= 0){
        window.location.href = 'index.html';
      }
      ///rotation
      if(keyDown[keys[1]]==1 || keyDown[keys2[1]]==1){ //A
        if(this.raccel<this.raccelspeed*(9))
        this.raccel+=this.raccelspeed*d;
      }if(keyDown[keys[0]]==1 || keyDown[keys2[0]]==1){ //D
        if(this.raccel>this.raccelspeed*(-9)) 
        this.raccel-=this.raccelspeed*d;
      }
      this.r+=this.raccel;
      // <> console.log(this.raccel);
      if(this.raccel>0)this.raccel-=(this.raccelspeed/2)*d;
      if(this.raccel<0)this.raccel+=(this.raccelspeed/2)*d;
      if(abs(this.raccel)<this.raccelspeed/2*d)this.raccel=this.raccel/2;

      if(this.displaycredits>this.credits)this.displaycredits--;
      if(this.displaycredits<this.credits)this.displaycredits++;

      
      //forward and backward speeds
      if(keyDown[keys[2]]==1 ||keyDown[keys2[2]]==1 ){
        this.rocketfire = true;
        if(this.faccel<this.faccelspeed*(this.maxfs))
        this.faccel+=this.faccelspeed*d;
      
      }
      else this.rocketfire = false;
      if(keyDown[keys[3]]==1 || keyDown[keys2[3]]==1){
        if(this.faccel>this.faccelspeed*(-1*this.maxbs))
        this.faccel-=this.faccelspeed*d;
      }
  
      this.x+=cos(this.r)*this.faccel*d;
      this.y+=sin(this.r)*this.faccel*d;
  
      if(this.faccel>0)this.faccel-=this.faccelspeed/4*d;
      if(this.faccel<0)this.faccel+=this.faccelspeed/4*d;
      if(dist(this.faccel,0,0,0)<this.faccelspeed/2*d)this.faccel=0;


      if(this.faccel==0&&this.health<100)this.health+=0.02*d;
      if(this.health<100)this.health+=0.01*d;

      if(dist(this.x,this.y,0,0)>worldsize){
        this.health-=0.06*d;
        fill(255,0,0);
        textSize(30);
        noStroke();
        textAlign(CENTER);
        text("WARNING return to map",width/2,height*1/4);
      }
      
      if(this.ammo<100){
        this.ammo+=this.reload/15;
      }

      //shooting

      if(keyDown[keys[4]]==1 &&this.ammo>20 && reloaded){
        this.ammo-=20;
        lasers.push(new Projectile(this.x,this.y,player.r,this.calculateDamage(this.bulletDamage),this.bulletSpeed));
        reloaded=false;

        if(this.faccel>=-1*this.maxfs)
        this.faccel-=this.faccelspeed*this.maxfs/3;
      }
      
    }
    calculateDamage(bd){
      // this one is the linear one
      //return 10+bd*3;
      // logarithmic

      return (7*Math.log(0.5*bd+1)+10 );
      
    }
    draw(){
      this.movement();
      
      drawSpaceship(width / 2, height /2 +m,this.r, this.rocketfire);
      textSize(30);
      fill (255);
      noStroke();
      textAlign(LEFT);
      text(String(this.name), 200, height -50)

      if (this.name === null){
        window.location.href = 'index.html';
      }
      
      //drawSpaceship(width / 2, height /2 ,this.r, this.rocketfire);
    
      if (this.health <= 0){
        window.location.href = 'index.html';
      }
    }

  
  }
  
  