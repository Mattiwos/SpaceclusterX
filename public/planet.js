class planet{
    constructor(px,py,sz){
        this.x=px;
        this.y=py;
        this.s=sz;
        this.rc=px;
        this.r=random(0,255);
        this.b=random(0,255);
        this.g=random(0,255);


    }
    draw(){

        /*for(var k=0;k<20;k++){
            fill(255,100-k*255/20);
            strokeWeight(1);
            noStroke();
            //ellipse(this.x-player.x+width/2,
           //     this.y-player.y+height/2,this.s+2+k,this.s+2+k);
        }*/


        strokeWeight(2);
        fill (this.r,this.b,this.g);
        stroke(this.r/2,this.b/2,this.g/2);
        ellipse(this.x-player.x+width/2,
        this.y-player.y+height/2,this.s,this.s);
        
    }




}