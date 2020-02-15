class Oprojectile{
    constructor(x,y,r){
        this.x = x
        this.y = y
        this.r = r
        this.glow=15;
        this.ratio=10;
        this.size=25;

    }
    colisiondetection(){
        if (dist(player.x,this.x,player.y,this.y) <= this.size){ 
            //need to improve collision detection if statment
            player.health-= 5
        }
    }
    update(){
        colisiondetection()

        push()
        translate(-player.x,-player.y)

        beginShape();
            vertex(this.x+cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x+cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y+sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);

            vertex(this.x-cos(this.r)*this.size -cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size -sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            vertex(this.x-cos(this.r)*this.size +cos(this.r+PI/2)*this.size/this.ratio+width/2,this.y-sin(this.r)*this.size +sin(this.r+PI/2)*this.size/this.ratio+height/2+m);
            endShape();
        pop();
    }
}