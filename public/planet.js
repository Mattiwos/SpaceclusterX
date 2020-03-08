class planet{
    constructor(px,py,sz,sr,sb,sg,craterz){

        //ag, dist , cratersz , craterfill
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
        this.craterrand = craterz
        this.createrloc = [];
        
        this.spawn=false;
        for(var o=0; o< this.craterrand.length;o++){
            //cx cy cf cs
            this.createrloc.push([this.x+cos(this.craterrand [o][0])*this.craterrand[o][1],this.y+sin (this.craterrand [o][0])*this.craterrand[o][1], this.craterrand [o][3],this.craterrand [o][2]] )
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
        this.planetExport = [2,3]
        //exportss , upgrade, upgradecost
        //planetExport,upgrades,cityUpgradeResources
        this.hubs = []
        this.onehub = createHub(this.x,this.y,this.s,this.craterrand [0][0])
        
        this.hubs.push(new hub(this.onehub[0],this.onehub[1],this.planetExport,this.onehub[2],this.onehub[3]))

    }
    draw(){
        push();
        for (var i =0;i<this.hubs.length; i++){
            this.hubs[i].draw()
        }
        translate(-player.x,-player.y);
        
        

        for(let k=0;k<20;k++){ //draws planet outter circles that make it glow
            //nice very creative
            fill(this.r/2,this.b/2,this.g/2,100-k*255/20);

            
            strokeWeight(2);
            noStroke();
            ellipse(this.x+width/2,
            this.y+height/2+m,this.s+2+4*k,this.s+2+4*k);
        }
        
        /// planet 
        strokeWeight(2);
        fill (this.r,this.b,this.g);
        stroke(this.r/2,this.b/2,this.g/2);
        noStroke();
        ellipse(this.x+width/2,
        this.y+height/2+m,this.s,this.s);
        //

        //craters
        for(let k=0;k<this.createrloc.length;k+=1){
            noStroke();
            fill(this.r/2,this.b/2,this.g/2,this.createrloc[k][2]);
            
            ellipse(this.createrloc[k][0] + width/2 ,this.createrloc[k][1]+ height/2 + m,this.createrloc[k][3],this.createrloc[k][3]);
            //print(k);
        }
       
        
        pop();
        
    }




}
