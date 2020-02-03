class hub{
    constructor(x,y){
        //this.p=planet;
        this.x=x;
        this.y=y;
    }
    draw(){
        fill(200);
        noStroke();
        ellipse(this.x+width/2,this.y+height/2,30,30);
        
    }


}