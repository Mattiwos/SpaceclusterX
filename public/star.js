class star{

    constructor(x,y){
        this.x=x;
        this.y=y;
        //star size
        this.s=5;
        this.glow=4;
    }
    draw(){

        push();
        translate(-player.x/starspeed,-player.y/starspeed);
        fill (255);
        noStroke();
        ellipse(this.x+width/2,this.y+height/2,this.s,this.s);

        for(var u=0;u<this.glow;u++){
            noFill();
            stroke(255,255-255/this.glow*u);
            strokeWeight(1);
            ellipse(this.x+width/2,this.y+height/2,this.s+u,this.s+u);
        }

        pop ();
    }
}