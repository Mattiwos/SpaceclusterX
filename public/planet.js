class planet{
    constructor(px,py,sz,sr,sb,sg){
        this.x=px;
        this.y=py;
        this.s=sz;
        this.rc=px;
        this.r=sr;
        this.b=sb;
        this.g=sg;

        this.cx=[];
        this.cy=[];
        this.cs=[];
        this.cf=[];

        this.craters=random(0,4);
        this.spawn=false;

        this.city=[];
        for(var o=0;o<this.craters;o++){
            this.ag=random(0,2*PI);
            this.dist=random(0,this.s/2-0);
            this.city.push(new hub(this.x+this.dist*cos (this.ag),this.y+this.dist*sin (this.ag)));
        }
        //this.craters=random(this.s^2/16000,this.s^2/8000);

        this.craters=random(10,40);
        for(var o=0;o<this.craters;o++){

            this.ag=random(0,2*PI);
            this.cs.push(random(25,80));
            this.dist=random(0,this.s/2-this.cs[o]/2);
            
            this.cx.push(this.x+this.dist*cos (this.ag));
            this.cy.push(this.y+this.dist*sin (this.ag));
            this.cf.push(random(0,255));
            
        }
        /*for(var o=0;o<this.craters;o++){

            for(var u=0;u<3;u++){
                this.ag=random(0,2*PI);
                this.dist=random(0,this.s/2);
                
                this.cx.push(this.x+this.dist*cos (this.ag));
                this.cy.push(this.y+this.dist*sin (this.ag));
                this.cf.push(random(0,255));
            }
            
        }*/

    }
    draw(){
        push();
        translate(-player.x,-player.y);

        for(let k=0;k<20;k++){
            fill(this.r/2,this.b/2,this.g/2,100-k*255/20);

            
            strokeWeight(2);
            noStroke();
            ellipse(this.x+width/2,
            this.y+height/2+m,this.s+2+4*k,this.s+2+4*k);
        }
       

        strokeWeight(2);
        fill (this.r,this.b,this.g);
        stroke(this.r/2,this.b/2,this.g/2);
        noStroke();
        ellipse(this.x+width/2,
        this.y+height/2+m,this.s,this.s);

        for(let k=0;k<this.cx.length-1;k+=3){
            noStroke();
            fill(this.r/2,this.b/2,this.g/2,this.cf[k]);

            //fill(this.r/2*this.cf[k]/255,this.b/2*this.cf[k]/255,this.g/2*this.cf[k]/255);


            //triangle(this.cx[k]+width/2,this.cy[k]+height/2,
             //   this.cx[k+1]+width/2,this.cy[k+1]+height/2,
             //   this.cx[k+2]+width/2,this.cy[k+2]+height/2,)

            ellipse(this.cx[k]+width/2,this.cy[k]+height/2+m,this.cs[k],this.cs[k]);
            //print(k);
        }


        for(let k=0;k<this.city.length-1;k++){
            this.city[k].draw();
        }


        pop();
        
    }




}