class Projectile{
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
        this.size=10;
        this.lifespan=100;
    }
    draw(){

        push();
        translate(-player.x,-player.y);

        noStroke();
        if(this.lifespan>10)
        fill (255,0,0);
        else
        fill(255,0,0,this.lifespan*255/10);
        this.lifespan-=2;
        beginShape();
        vertex(this.x+cos(this.r)*this.size +cos(this.r+PI/2*this.size/2)+width/2,this.y+sin(this.r)*this.size +sin(this.r+PI/2*this.size/2)+height/2+m);
        vertex(this.x+cos(this.r)*this.size -cos(this.r+PI/2*this.size/2)+width/2,this.y+sin(this.r)*this.size -sin(this.r+PI/2*this.size/2)+height/2+m);

        vertex(this.x-cos(this.r)*this.size -cos(this.r+PI/2*this.size/2)+width/2,this.y-sin(this.r)*this.size -sin(this.r+PI/2*this.size/2)+height/2+m);
        vertex(this.x-cos(this.r)*this.size +cos(this.r+PI/2*this.size/2)+width/2,this.y-sin(this.r)*this.size +sin(this.r+PI/2*this.size/2)+height/2+m);
        endShape();
        
        this.x+=cos(this.r)*(14+player.bulletSpeed*2);
        this.y+=sin(this.r)*(14+player.bulletSpeed*2);

        
        pop ();
        ///test collision with other players!

        ///to implement
    }
}