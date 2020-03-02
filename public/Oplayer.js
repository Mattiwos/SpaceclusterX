

class Oplayer{
    constructor(initx,inity,initr,rocketfire,id,name,credit){
        this.x = initx;
        this.y = inity;
        this.r = initr;
        this.rocketfire = rocketfire;
        this.id = id;
        this.name = name;
        this.credits=credit;

    }
    draw(){
        push();
        translate(-player.x + width/2,-player.y + m + height /2)
        drawSpaceship(this.x, this.y,this.r, this.rocketfire);
        text(String(this.name), this.x +3, this.y);
        pop()

    }
    update(x,y,r,rocketfire,id,name = this.name,credit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.rocketfire = rocketfire;
        this.id = id
        this.name = name;
        this.credits = credit

    }
//


}