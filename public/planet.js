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

        
        this.spawn=false;

        this.city=[];



        this.craters=random(10,40);
        for(var o=0;o<this.craters;o++){

            this.ag=random(0,2*PI);
            this.cs.push(random(25,80));
            this.dist=random(0,this.s/2-this.cs[o]/2);
            
            this.cx.push(this.x+this.dist*cos (this.ag));
            this.cy.push(this.y+this.dist*sin (this.ag));
            this.cf.push(random(0,255));
            
        }

        this.planetExport=[];
        //this.planetExportCost=[];
        this.planetResources=random(0,3);
        //cfreates the planets natural resources that it sells on the citys
        for(let k=0;k<this.planetResources;k++){
            this.possible=int(random(1,numOfResources+1));
            this.exists=true;
            while(this.exists==true){
                this.possible=int(random(1,numOfResources+1));
                this.exists=false;
                for(let h=0;h<this.planetExport.length;h++){
                    if(this.possible==this.planetExport[h])this.exists=true;
                }
            }
            this.planetExport.push(this.possible);
        }

        //print("exports:"+this.planetExport);

        this.craters=random(0,3);
        
        for(var o=0;o<this.craters;o++){
            this.touching=true;
            while(this.touching==true){
                this.ag=random(0,2*PI);
                this.dist=random(0,this.s/2-0);
                this.touching=false;
                for(let i=0;i<this.city.length;i++){
                    if(dist(this.x+this.dist*cos(this.ag),this.y+this.dist*sin(this.ag),this.city[i].x,this.city[i].y)<this.city[i].citysize){
                        this.touching=true;
                    }
                }
            }
            this.city.push(new hub(this.x+this.dist*cos (this.ag), this.y+this.dist*sin (this.ag), this.r,this.g,this.b,this));
        }
        //this.craters=random(this.s^2/16000,this.s^2/8000);

        
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
        for(let k=0;k<this.city.length-1;k++){
            this.city[k].drawGraphics();
        }


        pop();
        
    }




}