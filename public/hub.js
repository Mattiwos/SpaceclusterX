

class hub{
    constructor(x,y,r,g,b){
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

        //the amount of different resources in the game ; constant !
        this.numOfResources=4;
        //more constants
        this.spacing=0.7;
        //how far out the circle goes
        this.displaywidth=170;



        this.rotate=0;

        //hub IMPORT
        //it buys this from u
        this.hubImport=[];
        this.hubImportValue=[];
        this.importNum=random(1,2);

        //create unique imports
        for(let k=0;k<this.importNum;k++){
            this.possible=int(random(1,5));
            this.exists=true;
            while(this.exists==true){
                this.possible=int(random(1,5));
                this.exists=false;
                for(let h=0;h<this.hubImport.length;h++){
                    if(this.possible==this.hubImport[h])this.exists=true;
                }
            }
            this.hubImport.push(this.possible);
            this.hubImportValue.push(int(random(4,8)));
        }

        //hub EXPORT
        this.hubExport=[];
        this.hubExportCost=[];
        this.exportNum=random(1,2);

        //create unique things for sale, cannot be the same as the imports
        for(let k=0;k<this.exportNum;k++){
            this.possible=int(random(1,5));
            this.exists=true;
            while(this.exists==true){
                this.possible=int(random(1,5));
                this.exists=false;
                for(let h=0;h<this.hubImport.length;h++){
                    if(this.possible==this.hubImport[h])this.exists=true;
                }
                for(let h=0;h<this.hubExport.length;h++){
                    if(this.possible==this.hubExport[h])this.exists=true;
                }
            }
            this.hubExport.push(this.possible);
            this.hubExportCost.push(int(random(1,4)));
        }


        //this.rr.push(random(0,255));
        //this.rg.push(random(0,255));
        //this.rb.push(random(0,255));
        
        for(var h=0;h<this.rectnumber;h++){
            this.ag=random(0,2*PI);
            this.dist=random(0,this.citysize/2-0);
            
            this.rectx.push(this.x+cos (this.ag)*this.dist);
            this.recty.push(this.y+sin (this.ag)*this.dist);
            
            this.rf.push(int(random(0,255)));
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
            fill(0,0,0,100-k*255/this.glow);
            strokeWeight(2);
            noStroke();
            ellipse(this.x+width/2,
            this.y+height/2+m,this.citysize+2+4*k,this.citysize+2+4*k);
        }


        for(var p=0;p<this.rectnumber-1;p++){
            noStroke();
            fill(this.rf[p]);
            //fill(this.rr[0],this.rg[0],this.rb[0],this.rf[p]);
            //rect (this.rectx[p]-this.rects/2+width/2,this.recty[p]-this.rects/2+height/2,this.rects,this.rects);

            ellipse (this.rectx[p]+width/2,this.recty[p]+height/2+m,this.rects,this.rects);
            stroke(0);
            strokeWeight(2);
            //if(p!=0)line (this.rectx[p]+width/2,this.recty[p]+height/2,
            //    this.rectx[p-1]+width/2,this.recty[p-1]+height/2);
        }

        //print(this.x+width/2+" "+this/this.y+width/2);


        


    }
    drawGraphics(){

        this.rotate+=0.004;
        if(dist (this.x,this.y,player.x,player.y)<this.citysize/2+30){
            stroke(50,180);
            strokeWeight(60);
            noFill();
            ellipse(this.x+width/2,this.y+height/2+m,this.displaywidth,this.displaywidth);

            for(let h=0;h<this.exportNum;h++){
                this.resourcex=this.x+width/2 +cos(h*this.spacing+this.rotate)*this.displaywidth*0.5;
                this.resourcey=this.y+height/2+m +sin(h*this.spacing+this.rotate)*this.displaywidth*0.5;
                drawResource(this.resourcex,this.resourcey,this.hubExport[h],4);
                //print(this.hubExport[h]);
                fill(255);
                textSize(25);
                noStroke();
               // text(this.resourceExportCost[h],this.resourcex-10,
              //  this.resourcey+40);

                if(mouseIsPressed&&mouseP==false&&dist (mouseX,mouseY,this.resourcex,this.resourcey)<30){

                }
            }
        }

    }


}

