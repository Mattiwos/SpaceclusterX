

class hub{
    constructor(x,y,r,g,b,motherplanet){
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

        this.motherplanet=motherplanet;
        //the amount of different resources in the game ; constant !


        //Creates the upgrades

       this.upgrades=[];
       this.numOfUpgrades=int(random(0,2));
       if(random(0,10)<2)this.numOfUpgrades=2;
       this.upgradeCost=[];
       this.upgradeResources=[];

        for(let i=0;i<this.numOfUpgrades;i++){
            this.upgradeResources.push([]);
           this.upgrade = int(random(0,upgradeCost.length));
           this.exists=true;
           while(this.exists==true){
                this.upgrade = int(random(0,upgradeCost.length));
                this.exists=false;
                for(let j=0;j<this.upgrades.length;j++){
                    if(this.upgrades[j]==this.upgrade)this.exists=true;
                }
           }

           this.upgradeCost.push(int(random(upgradeCost[this.upgrade],upgradeCost[this.upgrade]+5)));
           for(let u=0;u<numOfResourcesUpgrade[this.upgrade];u++){
               this.upgradeResources[i].push
               (upgradeResources[this.upgrade][ int(random(0,upgradeResources[this.upgrade].length))  ]   );
           }
           this.upgrades.push(this.upgrade);



       }
        

        

        //more constants
        this.spacing=0.7;
        //how far out the circle goes
        this.displaywidth=170;

        this.popup=0;

        this.rotate=0;

        this.hubExport=[];
        this.hubExportCost=[];
        //this.exportNum=random(1,2);

        

        for(let k=0;k<this.motherplanet.planetExport.length;k++){
           // this.hubExport.push(this.motherplanet.planetExport[k]);
            this.hubExportCost.push(int(random(3,5)));
        }

        this.hubExport = this.motherplanet.planetExport;

        //create unique imports
        this.hubImport=[];
        this.hubImportValue=[];
        this.importNum=random(0,2);
        //hub Import
        //if(false)
        for(let k=0;k<this.importNum;k++){
            this.possible=int(random(1,numOfResources+1));
            this.exists=true;
            while(this.exists==true){
                this.possible=int(random(1,numOfResources+1));
                this.exists=false;
                for(let h=0;h<this.hubImport.length;h++){
                    if(this.possible==this.hubImport[h])this.exists=true;
                }
                for(let h=0;h<this.hubExport.length;h++){
                    if(this.possible==this.hubExport[h])this.exists=true;
                }
            }
            this.hubImport.push(this.possible);
            this.hubImportValue.push(int(random(6,10)) );
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

        
        

        


    }
    drawGraphics(){

        this.rotate+=0.004;
        if(dist (this.x,this.y,player.x,player.y)<this.citysize/2+30){
            stroke(50,120);
            strokeWeight(60*this.popup/this.displaywidth);
            noFill();
            ellipse(this.x+width/2,this.y+height/2+m,this.popup,this.popup);
            if(this.popup<this.displaywidth)this.popup+=25;
            
            for(let h=0;h<this.hubExport.length;h++){
                
                this.resourcex=this.x+width/2 +cos(h*this.spacing+this.rotate)*this.popup*0.5;
                this.resourcey=this.y+height/2+m +sin(h*this.spacing+this.rotate)*this.popup*0.5;

                stroke(50,255);
                strokeWeight(40*this.popup/this.displaywidth);

                //arc (this.x+width/2,this.y+height/2+m,this.popup*0.9,this.popup*0.9,h*this.spacing+this.rotate+this.spacing/3,
                //    h*this.spacing+this.rotate-this.spacing/3);

                drawResource(this.resourcex,this.resourcey,this.hubExport[h],4*this.popup/this.displaywidth);
                fill(255);
                textSize(25);
                noStroke();
                text(this.hubExportCost[h],this.resourcex-10,
                this.resourcey+40);
                if(mouseIsPressed&&mouseP==false&&dist (mouseX+player.x,mouseY+player.y,this.resourcex,this.resourcey)<30){
                    
                    if(player.credits>=this.hubExportCost[h] &&player.cargobay.length<player.storage){
                        player.credits-=this.hubExportCost[h];
                        player.cargobay.push(this.hubExport[h]);
                        player.cargostate.push(100);
                        mouseP=true;
                    }
                }
            }
            for(let h=0;h<this.hubImport.length;h++){
                this.resourcex=this.x+width/2 +cos(h*this.spacing+this.rotate+PI)*this.popup*0.5;
                this.resourcey=this.y+height/2+m +sin(h*this.spacing+this.rotate+PI)*this.popup*0.5;
                drawResource(this.resourcex,this.resourcey,this.hubImport[h],4*this.popup/this.displaywidth);
                //print(this.hubExport[h]);
                fill(0);
                textSize(25);
                noStroke();
                text(this.hubImportValue[h],this.resourcex-10,
                this.resourcey+40);
                if(mouseIsPressed&&mouseP==false&&dist (mouseX+player.x,mouseY+player.y,this.resourcex,this.resourcey)<30){
                    
                    for(var p=0;p<player.cargobay.length;p++){
                        if(player.cargobay[p]==this.hubImport[h]&&player.cargostate[p]>-100){
                            player.cargostate[p]=-100;
                            player.credits+=this.hubImportValue[h];
                            mouseP=true;
                            break;
                        }
                    }
                    
                }
            }
            //display the upgrades available to purchase
            for(let h=0;h<this.upgrades.length;h++){
                this.resourcex=this.x+width/2 +cos(h*this.spacing+this.rotate+PI+this.hubImport.length*this.spacing)*this.popup*0.5;
                this.resourcey=this.y+height/2+m +sin(h*this.spacing+this.rotate+PI+this.hubImport.length*this.spacing)*this.popup*0.5;

                textAlign(CENTER);
                fill(255);
                textSize(17);

                text(upgradeName[this.upgrades[h]],this.resourcex,this.resourcey-0);
                textSize(20);
                fill(200);
                text(this.upgradeCost[h],this.resourcex,this.resourcey+20);
                
                for(let i=0;i<this.upgradeResources[h].length;i++){
                    //print("upgraderesource"+this.upgradeResources);
                    //drawResource(this.resourcex,this.resourcey,this.hubImport[h],4*this.popup/this.displaywidth);
                    //drawResource(
                    //    this.resourcex-this.upgradeResources[h].length*5+i*10,
                  //      this.resourcey+10,this.hubImport[h],4*this.popup/this.displaywidth
                  //      );
                  
                    drawResource(
                        this.resourcex-(this.upgradeResources[h].length-1)*10 +(i*20),
                        this.resourcey+30,this.upgradeResources[h][i],2*this.popup/this.displaywidth
                        );


                        //buying the upgrades
                        //if(false)
                        if(mouseIsPressed&&mouseP==false&&dist (mouseX+player.x,mouseY+player.y,this.resourcex,this.resourcey)<30){

                            //print("cargo bay before"+player.cargostate);
                            //this variable is the ones needed
                            this.resourcesneeded=[];
                            this.fakecargobay=[];
                            //makes them all 0


                            for(let w=0;w<player.cargobay.length;w++){
                                this.fakecargobay.push(0);
                            }

                            this.resourcesneeded=this.upgradeResources[h];
                            this.changes=0;
                                for(var p=0;p<this.resourcesneeded.length;p++){
                                    //goes through each of the cargo bays to see if it has the one
                                    //that its looking for
                                    this.q=0;
                                    this.found=false;
                                    while(this.q<this.fakecargobay.length &&this.found==false){
                                        if(player.cargobay[this.q]==this.upgradeResources[h][p]
                                            &&this.fakecargobay[this.q]==0&&player.cargostate[this.q]>-100){
                                            //this.q=1000;
                                            this.found=true;

                                            this.fakecargobay[this.q]=-100;
                                            this.changes++;
                                        }
                                        this.q++;
                                    }
                                    //if it did find one it saves the index of it
                                    if(this.found){
                                        
                                    }
                                }
                                //if(false)
                                if(this.changes==this.resourcesneeded.length && player.credits>=this.upgradeCost[h]){
                                    for(let u=0;u<this.fakecargobay.length;u++){
                                        if(this.fakecargobay[u]==-100)player.cargostate[u]=-100;
                                    }

                                    if(this.upgrades[h]==0)player.reload++;
                                    if(this.upgrades[h]==1)player.bulletSpeed++;
                                    if(this.upgrades[h]==2)player.bulletDamage++;
                                    player.credits-=this.upgradeCost[h];
                                    mouseP=true;
                                }
//print("cargo bay after"+player.cargostate);
                            
                        }


                    }

                   
            }
            

        }else this.popup=0;

    }


}

