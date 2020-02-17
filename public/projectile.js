class Projectile{
    constructor(x,y,r,dmg =5,id = round(Math.random() * 10000000),playerid =socket.id,speed){
        this.x=x;
        this.y=y;
        this.r=r;
        this.dmg = dmg;
        this.size=25;

        this.lifespan=100;

        this.lifespan=100;

        this.glow=15;
        this.ratio=10;
        this.id = id
        this.playerid = playerid;

        this.speedmult=0.36;

        this.speed=speed;

        if (this.playerid == socket.id){
            gunshoot(this.x,this.y,this.r,this.dmg,this.id);
        }
        
   
    }
    colisiondetection(){
//<<<<<<< HEAD
        //if (dist(this.x,this.y,player.x,player.y) <= this.size){ 
//=======
        push();
        translate(-player.x + width/2,-player.y + m + height /2)
        if (this.playerid != socket.id){
             if (dist(this.x,this.y,player.x,player.y) <= this.size+10){ 
//>>>>>>> fca3e10fbd6bfd1cddff4d581354618cdd194829
            //need to improve collision detection if statment
              player.health-= this.dmg;
              this.lifespan=0;
            }
        }
    
        
        pop()
        
    }

    draw(){
        this.colisiondetection();
        push();
        
        translate(-player.x,-player.y);

        noStroke();
        if(this.lifespan>20)
        fill (255,0,0);
        else
        fill(255,0,0,this.lifespan*255/15);
        this.lifespan-=2.4;
        this.savex=this.x;
        this.savey=this.y;
        for(let i=1;i>0;i--){
            //this.size=15+i;
           

            if(this.lifespan>15)
                fill(255,0,0,255-i*50);
            else{
                
                fill(255,0,0,this.lifespan*255/15);
                
            }
            this.x=this.savex+cos(this.r)*(14+this.speed*3.4)*i-1*this.speedmult;
            this.y=this.savey+sin(this.r)*(14+this.speed*3.4)*i-1*this.speedmult;
            beginShape();
            vertex(this.x+cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x+cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);

            vertex(this.x-cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x-cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            endShape();

            if(this.lifespna<=15)i=0;
        }
        this.x=this.savex;
        this.y=this.savey;
        this.size=20;

        
        
        this.x+=cos(this.r)*(18+this.speed*3.4)*d*this.speedmult;
        this.y+=sin(this.r)*(18+this.speed*3.4)*d*this.speedmult;

        
        pop ();
        ///test collision with other players!

        ///to implement
    }
}