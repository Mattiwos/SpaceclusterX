class star{

    constructor(x,y,starspeed){
        this.x=x;
        this.y=y;
        //star size
        this.s=5;
        //star speed 
        //this.ss =4;
        this.ss =starspeed;


        this.glow=4;
    }
    draw(){

        push();

        // translate(-player.x/this.ss,-player.y/this.ss);
        translate(-player.x,-player.y);
        fill (255);
        noStroke();
        ellipse(this.x+width/2,this.y+height/2+m,this.s,this.s);

        for(var u=0;u<this.glow;u++){
            noFill();
            stroke(255,255-255/this.glow*u);
            strokeWeight(1);
            ellipse(this.x+width/2,this.y+height/2+m,this.s+u,this.s+u);
        }

        pop ();
    }
}