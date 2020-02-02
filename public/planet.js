class planet{
    constructor(px,py,sz){
        this.x=px;
        this.y=py;
        this.s=sz;
        this.rc=px;
        this.r=random(0,255);
        this.b=random(0,255);
        this.g=random(0,255);

        this.cx=[];
        this.cy=[];
        this.cs=[];
        this.craters=random(1,5);
        this.spawn=false;
        for(let o=0;o<this.craters;o++){
            this.cs.push(random(20,30));
            this.ag=random(0,2*PI);
            this.dist=random(0,this.sz/2-this.cs[this.cs.length-1]/2);
            this.cx.push(this.x+this.dist*cos(this.ag));
            this.cy.push(this.y+this.dist*sin(this.ag));
            
        //    if(dist (this.x,this.y,this.cx[this.cx.length],this.cy[this.cy.length])+cs[this.cx.length]>this.s)
         //   this.cs[this.cy.length]=0;
        }

    }
    draw(){
        push();
        translate(-player.x,-player.y);

        for(var k=0;k<20;k++){
            fill(this.r/2,this.b/2,this.g/2,100-k*255/20);
            strokeWeight(2);
            noStroke();
            ellipse(this.x+width/2,
            this.y+height/2,this.s+2+4*k,this.s+2+4*k);
        }
       

        strokeWeight(2);
        fill (this.r,this.b,this.g);
        stroke(this.r/2,this.b/2,this.g/2);
        noStroke();
        ellipse(this.x+width/2,
        this.y+height/2,this.s,this.s);

        for(var k=0;k<this.cx.length;k++){
            stroke(this.r/2,this.b/2,this.g/2);
            strokeWeight(3);
            noFill();
            fill(this.r/2,this.b/2,this.g/2);
            ellipse(this.cx[k]+width/2,this.cy[k]-player.y+height/2,this.cs[k],this.cs[k]);
        }
        pop();
        
    }




}