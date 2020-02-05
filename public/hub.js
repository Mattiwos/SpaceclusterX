class hub{
    constructor(x,y){
        //this.p=planet;
        this.x=x;
        this.y=y;
        //print("works");
        this.citysize=50;

        this.rectx=[];
        this.recty=[];
        this.rr=[];
        this.rg=[];
        this.rb=[];
        this.rectnumber=random(2,8);
        this.rects=10;

        this.rf=[];



        //this.rr.push(random(0,255));
        //this.rg.push(random(0,255));
        //this.rb.push(random(0,255));
        
        for(var h=0;h<this.rectnumber;h++){
            this.ag=random(0,2*PI);
            this.dist=random(0,this.citysize/2-0);
            
            this.rectx.push(this.x+cos (this.ag)*this.dist);
            this.recty.push(this.y+sin (this.ag)*this.dist);
            
            this.rf.push(random(0,255));
        }

        this.glow=5;
    }
    draw(){
        fill(20);
        noStroke();
        //ellipse(this.x+width/2,this.y+height/2,this.citysize,this.citysize);
        fill(50);
        ellipse(this.x+width/2,this.y+height/2+m,this.citysize*8/9,this.citysize*8/9);

        for(let k=0;k<this.glow;k++){
            //fill(this.rr[0],this.rb[0],this.rg[0],100-k*255/this.glow);
            fill(0,100-k*255/this.glow);
            strokeWeight(2);
            noStroke();
            ellipse(this.x+width/2,
            this.y+height/2+m,this.citysize+2+4*k,this.citysize+2+4*k);
        }


        for(var p=0;p<this.rectnumber-1;p++){
            noStroke();
            fill(this.rf[p]);
            fill(this.rr[0],this.rg[0],this.rb[0],this.rf[p]);
            //rect (this.rectx[p]-this.rects/2+width/2,this.recty[p]-this.rects/2+height/2,this.rects,this.rects);

            ellipse (this.rectx[p]+width/2,this.recty[p]+height/2+m,this.rects,this.rects);
            stroke(0);
            strokeWeight(2);
            //if(p!=0)line (this.rectx[p]+width/2,this.recty[p]+height/2,
            //    this.rectx[p-1]+width/2,this.recty[p-1]+height/2);
        }

        //print(this.x+width/2+" "+this/this.y+width/2);
    }


}

function drawResource(x,y,resource,sc){
    //sc = scale factor
    noStroke();
    if(resource==1){

        ellipse(x,y,10*sc,10*sc);
    }
}