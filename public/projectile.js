class Projectile{
    constructor(x,y,r,dmg =5,id = round(Math.random() * 10000000),playerid =socket.id){
        this.x=x;
        this.y=y;
        this.r=r;
        this.dmg = dmg
        this.size=25;
        this.lifespan=100;
        this.glow=15;
        this.ratio=10;
        this.id = id
        this.playerid = playerid;

        if (this.playerid == socket.id){
            gunshoot(this.x,this.y,this.r,this.dmg,this.id)
        }
        
   
    }
    colisiondetection(){
        if (dist(player.x,this.x,player.y,this.y) <= this.size){ 
            //need to improve collision detection if statment
            player.health-= this.dmg
        }
    }

    draw(){
        this.colisiondetection()
        push();
        translate(-player.x,-player.y);

        noStroke();
        if(this.lifespan>20)
        fill (255,0,0);
        else
        fill(255,0,0,this.lifespan*255/20);
        this.lifespan-=2;
        this.savex=this.x;
        this.savey=this.y;
        for(let i=3;i>0;i--){
            //this.size=15+i;
           

            if(this.lifespan>15)
                fill(255,0,0,255-i*50);
            else{
                //i=0;
                fill(255,0,0,this.lifespan*255/15);
                
            }
            this.x=this.savex+cos(this.r)*(14+player.bulletSpeed*2)*i-1;
            this.y=this.savey+sin(this.r)*(14+player.bulletSpeed*2)*i-1;
            beginShape();
            vertex(this.x+cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x+cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);

            vertex(this.x-cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x-cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            endShape();
        }
        this.x=this.savex;
        this.y=this.savey;
        this.size=20;

        
        
        this.x+=cos(this.r)*(18+player.bulletSpeed*3)*d;
        this.y+=sin(this.r)*(18+player.bulletSpeed*3)*d;

        
        pop ();
        ///test collision with other players!

        ///to implement
    }
}