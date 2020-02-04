class Oplayer{
    constructor(initx,inity,initr,rocketfire,id){
        this.x = initx;
        this.y = inity;
        this.r = initr;
        this.rocketfire = rocketfire;
        this.id = id;


    }
    draw(){
        push()
        translate(-player.x,-player.y);
        drawSpaceship(this.x, this.y ,this.r, this.rocketfire);
        pop()
    }
    update(x,y,r,rocketfire){
        this.x = x;
        this.y = y;
        this.r = r;
        this.rocketfire = rocketfire;

    }
//


}