function createHub(x,y,s,ag,randomseed1,randomseed2,randomseed3){
    //   



    //randomseed is from 0 to 255
        
              // now it will create the x , y of the hub(s)
  
            touching=true;
            dists=s;

            randomseed=[randomseed1,randomseed2,randomseed3];
            randomseed=[noise(x,y,5),noise(x,y,6),noise(x,y,7)];
            
            while(touching==true){
                ;
                //dists=random(0,s/2);
                touching=false;
  
                for(let p=0;p<city.length;p++){
                  //console.log(city[p]);
                    ag+=0.2;
                    // change from distsance to sqrt pythagoram theorm
                    if(
                        Math.sqrt(Math.pow(city[p][0]-(x+dists*cos(ag)),2)+Math.pow(city[p][1]-(y+dists*sin(ag)),2))
                        
                        <citysize*2){
                        touching=true;
                    }
                    // old distsance dists(x+dists*cos(ag),y+dists*sin(ag),city[p].x,city[p].y)
                }
            }
            
            newx=x+dists*cos(ag);
            newy=y+dists*sin(ag);
            //next it will add the upgrades that are available
  
            upgrades=[];
            ///numOfUpgrades=getRandomInt(0,2);
           // alert(ag);
            // use ag to make it
            numOfUpgrades=floor((ag/(2*PI))*3);

            //if(random(0,10)<2)numOfUpgrades=2;
            //upgradeCost=[];
            cityUpgradeResources=[];
            
            
            for(let q=0;q<numOfUpgrades;q++){
              cityUpgradeResources.push([]);
  
                upgrade = floor(randomseed[q]*(upgradeName.length-1));
                //console.log("upgrade name"+upgradeName.length);
                exists=true;
                
                // <><><><> for now there could be the same uupgrade multiple times
           //     while(exists==true){
                     //   upgrade = getRandomInt(0,upgradeName.length-1);
                    //    exists=false;
                    //    for(let j=0;j<upgrades.length;j++){
                           // if(upgrades[j]==upgrade)exists=true;


                     //   }
           //     }
                
               // upgradeCost.push(upgradeCost[upgrade]);
                for(let u=0;u<numOfResourcesUpgrade[upgrade];u++){
                  //console.log(upgradeResources);
  
                 // cityUpgradeResources[cityUpgradeResources.length-1].push
                 //   (upgradeResources[upgrade][ getRandomInt(0,upgradeResources[upgrade].length)  ]   );
                        //using random seed
                    cityUpgradeResources[cityUpgradeResources.length-1].push
                    (upgradeResources[upgrade][ floor(randomseed[u]*upgradeResources[upgrade].length)  ]   );
                }
                
                upgrades.push(upgrade);
            }
            
              //// create the little circle graphics
  
              ///// >
              //////(!) for now they aren't the same
  
              return [newx,newy,upgrades,cityUpgradeResources];
  
              ////end loop for creating one hub
          
          /// condenses the imformation into the output
  
  
          /////here are all of the variables:
  
          // hubx , huby , EXPORT[array] , UPGRADES[array] ,upgradeResources[array]
  
          // note that: currently the IMPORTS (contracts) are not included, they will be added somewhere else
          // there will be a function that adds a contract to a random planet, in the constructor they don't get any
  
  
   //
      //if this thiasdlkasdlsf = 0
    //  return [[1,2,3],[1231,123],'1']
      
    //  return [[1,2,3],[1231,123]]
  
  }









class hub {

    // newx,newy,planetExport,upgrades,upgradeResources
    constructor(x ,y , exportss , upgrade, upgradecost){
        this.x = x;
        this.y = y;
        this.citysize = citysize;
        this. upgrades = [];
        this.upgrades = upgrade;

        this.upgradeResources = [];
        this. upgradeResources = upgradecost;

        this.spacing = 0.7;
        //how far out the circle goes
        this.displaywidth = 170;

        this.popup =0;

        this.rotate = 0;

        this.hubExport = [];
        this.hubExport = exportss;

        this.availableExports =[];


        this.hotkey=[49,50,51];

        for(let i=0;i<numOfResources;i++)this.availableExports.push(i+1);

        
        //alert(this.availableExports);

        for(var i=0;i<this.hubExport.length;i++){
            for(var g=0;g<this.availableExports.length;g++){
                if(this.availableExports[g]==this.hubExport[i]){
                    this.availableExports.splice(g,1);
                    g=100000;
                    
                }
            }
        }


        //making those graphics
        this.rectx = [];
        this.recty = [];
        this.rr = [];
        this.rg = [];
        this.rb = [];
        this.rectnumber = random(2, 8);
        this.rects = 10;
        this.rf = [];

        for (var h = 0; h < this.rectnumber; h++) {
            this.ag = random(0, 2 * PI);
            this.dists = random(0, this.citysize / 2 - 0);

            this.rectx.push(this.x + cos(this.ag) * this.dists);
            this.recty.push(this.y + sin(this.ag) * this.dists);

            this.rf.push(int(random(0, 255)));
        }

        this.glow = 5;



        /// creating the contracts
        ///// this will be added to the noise constructor later
        /// for now it is creating them randomly without it being the same
        /////
        this.contracts=[];
        this.contractcost=[];
        this.createContract();
        //this.createContract();
        

    }

    createContract() {
        this.resourceAmount = noise(this.x,this.y,1)*6;
        this.contracts.push([]);
      
        //noise(this.x,this.y,1);
        for (let i = 0; i < this.resourceAmount; i++) {
            //finds a resource that the planet dosen't sell
            this.contracts[this.contracts.length-1].push(this.availableExports[floor(noise(this.x,this.y,i+1)*this.availableExports.length)]);
        }
        //alert(noise(this.x,this.y,2)*this.availableExports.length);
        ///calculates the cost of the contract:
        this.differentresources=[];

        for(var i=0;i<this.contracts[this.contracts.length-1].length;i++){
            this.found=false;
            for(var j=0;j<this.differentresources.length;j++){
                if(this.contracts[this.contracts.length-1][i]==this.differentresources[j])
                this.found=true;
            }
            if(this.found==false)this.differentresources.push(this.contracts[this.contracts.length-1][i]);
        }
        this.contractcost.push((this.differentresources.length+1)*this.contracts[this.contracts.length-1].length);


    }


    

    
    
   
    getLocation() {

    }
    
    draw() {
        push();
        
        translate(-player.x,-player.y);

        textAlign(CENTER);
        fill(20);
        noStroke();
        //ellipse(this.x+width/2,this.y+height/2,this.citysize,this.citysize);
        fill(50);
        ellipse(this.x + width / 2, this.y + height / 2 + m, this.citysize * 8 / 9, this.citysize * 8 / 9);

        for (let k = 0; k < this.glow; k++) {
            //fill(this.rr[0],this.rb[0],this.rg[0],100-k*255/this.glow);
            fill(0, 0, 0, 100 - k * 255 / this.glow);
            strokeWeight(2);
            noStroke();
            ellipse(this.x + width / 2,
                this.y + height / 2 + m, this.citysize + 2 + 4 * k, this.citysize + 2 + 4 * k);
        }


        for (var p = 0; p < this.rectnumber - 1; p++) {
            noStroke();
            fill(this.rf[p]);
            //fill(this.rr[0],this.rg[0],this.rb[0],this.rf[p]);
            //rect (this.rectx[p]-this.rects/2+width/2,this.recty[p]-this.rects/2+height/2,this.rects,this.rects);

            ellipse(this.rectx[p] + width / 2, this.recty[p] + height / 2 + m, this.rects, this.rects);
            stroke(0);
            strokeWeight(2);
            //if(p!=0)line (this.rectx[p]+width/2,this.recty[p]+height/2,
            //    this.rectx[p-1]+width/2,this.recty[p-1]+height/2);
        }

        pop ();

    }
    /*

    */
    
    drawGraphics() {
        
        if(keyDown[this.hotkey[0]]!=1 && keyDown[this.hotkey[1]]!=1 && keyDown[this.hotkey[2]]!=1 )keyP=false;
        

        push();
        
        translate(-player.x,-player.y);

        this.rotate += 0.004;
        if (dist(this.x, this.y, player.x, player.y) < this.citysize / 2 + 30) {
            if(this.popup==0){
                for (let h = 0; h < this.contracts.length; h++) {
                    this.testIfContains(h);
                }
            }
            //print("drawing hub");
            stroke(50, 120);
            strokeWeight(60 * this.popup / this.displaywidth);
            noFill();
            ellipse(this.x + width / 2, this.y + height / 2 + m, this.popup, this.popup);
            if (this.popup < this.displaywidth) this.popup += 25;

            for (let h = 0; h < this.hubExport.length; h++) {

                this.resourcex = this.x + width / 2 + cos(h * this.spacing + this.rotate) * this.popup * 0.5;
                this.resourcey = this.y + height / 2 + m + sin(h * this.spacing + this.rotate) * this.popup * 0.5;

                stroke(50, 255);
                strokeWeight(40 * this.popup / this.displaywidth);

                //arc (this.x+width/2,this.y+height/2+m,this.popup*0.9,this.popup*0.9,h*this.spacing+this.rotate+this.spacing/3,
                //    h*this.spacing+this.rotate-this.spacing/3);

                drawResource(this.resourcex, this.resourcey, this.hubExport[h], 4 * this.popup / this.displaywidth);
                fill(255);
                textSize(25);
                noStroke();
                //  text(this.hubExportCost[h],this.resourcex,
                //  this.resourcey+40);
                //if (mouseIsPressed && mouseP == false && dist(mouseX + player.x, mouseY + player.y, this.resourcex, this.resourcey) < 30) {
                if (
                        (mouseIsPressed && mouseP == false && dist(mouseX + player.x, mouseY + player.y, this.resourcex, this.resourcey) < 30)
                        ||(keyDown[this.hotkey[h]]==1 &&keyP==false) ) {

                    if (player.credits >= 1 && player.cargobay.length < player.storage) {
                        //player.credits-=this.hubExportCost[h];
                        player.credits -= 1;
                        player.cargobay.push(this.hubExport[h]);
                        player.cargostate.push(100);
                        
                        if(mouseIsPressed && mouseP == false && dist(mouseX + player.x, mouseY + player.y, this.resourcex, this.resourcey) < 30)mouseP=true;
                        if((keyDown[this.hotkey[h]]==1 &&keyP==false))keyP=true;
                    }
                }
            }
            
            //display the upgrades available to purchase
            for (let h = 0; h < this.upgrades.length; h++) {
                this.resourcex = this.x + width / 2 + cos(h * this.spacing + this.rotate + PI ) * this.popup * 0.5;
                this.resourcey = this.y + height / 2 + m + sin(h * this.spacing + this.rotate + PI ) * this.popup * 0.5;

                textAlign(CENTER);
                fill(255);
                textSize(17);
                noStroke();
                drawIcon(this.resourcex,this.resourcey-10,this.upgrades[h],7* this.popup / this.displaywidth);
               // text(upgradeName[this.upgrades[h]], this.resourcex, this.resourcey);
                textSize(20);
                fill(200);
                text(upgradeCost[this.upgrades[h]], this.resourcex, this.resourcey + 10);
                drawCredit(this.resourcex-15,this.resourcey+10,1* this.popup / this.displaywidth);
                drawCredit(this.resourcex+15,this.resourcey+10,1* this.popup / this.displaywidth);
                for (let i = 0; i < this.upgradeResources[h].length; i++) {
                    //print("upgraderesource"+this.upgradeResources);
                    //drawResource(this.resourcex,this.resourcey,this.hubImport[h],4*this.popup/this.displaywidth);
                    //drawResource(
                    //    this.resourcex-this.upgradeResources[h].length*5+i*10,
                    //      this.resourcey+10,this.hubImport[h],4*this.popup/this.displaywidth
                    //      );

                    drawResource(
                        this.resourcex - (this.upgradeResources[h].length - 1) * 10 + (i * 20),
                        this.resourcey + 30, this.upgradeResources[h][i], 2 * this.popup / this.displaywidth
                    );


                    //buying the upgrades
                    //if(false)
                    if (
                        (mouseIsPressed && mouseP == false && dist(mouseX + player.x, mouseY + player.y, this.resourcex, this.resourcey) < 30)
                         ) {
                     

                        //print("cargo bay before"+player.cargostate);
                        //this variable is the ones needed
                        this.resourcesneeded = [];
                        this.fakecargobay = [];
                        //makes them all 0


                        for (let w = 0; w < player.cargobay.length; w++) {
                            this.fakecargobay.push(0);
                        }

                        this.resourcesneeded = this.upgradeResources[h];
                        this.changes = 0;
                        for (var p = 0; p < this.resourcesneeded.length; p++) {
                            //goes through each of the cargo bays to see if it has the one
                            //that its looking for
                            this.q = 0;
                            this.found = false;
                            while (this.q < this.fakecargobay.length && this.found == false) {
                                if (player.cargobay[this.q] == this.upgradeResources[h][p]
                                    && this.fakecargobay[this.q] == 0 && player.cargostate[this.q] > -100) {
                                    //this.q=1000;
                                    this.found = true;

                                    this.fakecargobay[this.q] = -100;
                                    this.changes++;
                                }
                                this.q++;
                            }
                            //if it did find one it saves the index of it
                            if (this.found) {

                            }
                        }
                        //if(false)
                        if (this.changes == this.resourcesneeded.length && player.credits >= upgradeCost[this.upgrades[h]]) {
                            for (let u = 0; u < this.fakecargobay.length; u++) {
                                if (this.fakecargobay[u] == -100) player.cargostate[u] = -100;
                            }

                            if (this.upgrades[h] == 0) player.reload++;
                            if (this.upgrades[h] == 1) player.bulletSpeed++;
                            if (this.upgrades[h] == 2) player.bulletDamage++;
                            if (this.upgrades[h] == 3) player.storage++;
                            player.credits -= upgradeCost[this.upgrades[h]];
                            mouseP = true;
                        }
                        //print("cargo bay after"+player.cargostate);

                    }


                }


            }


            ////// displays the contracts that are available:::: jadklfjh

            
            for (let h = 0; h < this.contracts.length; h++) {
                this.resourcex = this.x + width / 2 + cos(h * this.spacing + this.rotate + PI + this.upgrades.length *this.spacing) * this.popup * 0.5;
                this.resourcey = this.y + height / 2 + m + sin(h * this.spacing + this.rotate + PI + this.upgrades.length *this.spacing ) * this.popup * 0.5;

                textAlign(CENTER);
                fill(255);
                textSize(17);
                noStroke();

                textSize(30);
                fill(200);
                // cdisply the value of it
                //need to add a value where it calculates where they are at
                //alert(this.contracts);
                text("+"+this.contractcost[h], this.resourcex, this.resourcey );
                drawCredit(this.resourcex-35,this.resourcey+0,2* this.popup / this.displaywidth);
                drawCredit(this.resourcex+35,this.resourcey+0,2* this.popup / this.displaywidth);

                for (let i = 0; i < this.contracts[h].length; i++) {

                    drawResource(
                        this.resourcex - (this.contracts[h].length - 1) * 10 + (i * 20),
                        this.resourcey + 30, this.contracts[h][i], 2 * this.popup / this.displaywidth
                    );


                    //buying the upgrades
                    //if(false)
                    if (mouseIsPressed && mouseP == false && dist(mouseX + player.x, mouseY + player.y, this.resourcex, this.resourcey) < 30) {
                        this.testIfContains(h);
                        //print("cargo bay before"+player.cargostate);
                        //this variable is the ones needed
                        
                        //print("cargo bay after"+player.cargostate);

                    }


                }


            }
            





        }else {
            this.popup = 0;
            fill(0,100);
            noStroke();
            rectMode(CENTER);
            rect (this.x+width/2,this.y+height/2+m-30-20*this.contracts.length,120,40*this.contracts.length);
            triangle(this.x+width/2+20,this.y+height/2+m-30,
                this.x+width/2-20,this.y+height/2+m-30,
                this.x+width/2+0,this.y+height/2+m-10)
            for(let i=0;i<this.contracts.length;i++){
             //ellipse(this.x + width / 2, this.y + height / 2 + m, this.citysize * 8 / 9, this.citysize * 8 / 9);
                for(let j=0;j<this.contracts[i].length;j++){
                    rectMode(CORNER);
                    drawResource(this.x+width/2 -40+20*j,this.y+height/2 +m- 40*i -50,this.contracts[i][j],2);
                    
                }
                fill(255);
                noStroke();
                textSize(30);
                text(this.contractcost[i],this.x+width/2 +40,this.y+height/2 +m- 40*i -50);
            }
            rectMode(CORNER);
        } 

        pop ();

    }

    testIfContains(h){
        this.resourcesneeded = [];
                        this.fakecargobay = [];
                        //makes them all 0


                        for (let w = 0; w < player.cargobay.length; w++) {
                            this.fakecargobay.push(0);
                        }

                        this.resourcesneeded = this.contracts[h];
                        this.changes = 0;
                        for (var p = 0; p < this.resourcesneeded.length; p++) {
                            //goes through each of the cargo bays to see if it has the one
                            //that its looking for
                            this.q = 0;
                            this.found = false;
                            while (this.q < this.fakecargobay.length && this.found == false) {
                                if (player.cargobay[this.q] == this.contracts[h][p]
                                    && this.fakecargobay[this.q] == 0 && player.cargostate[this.q] > -100) {
                                    //this.q=1000;
                                    this.found = true;

                                    this.fakecargobay[this.q] = -100;
                                    this.changes++;
                                }
                                this.q++;
                            }
                            //if it did find one it saves the index of it
                            if (this.found) {

                            }
                        }
                        //if(false)
                        if (this.changes == this.resourcesneeded.length) {
                            for (let u = 0; u < this.fakecargobay.length; u++) {
                                if (this.fakecargobay[u] == -100) player.cargostate[u] = -100;
                            }
                            //this.contracts.splice(h,1);
                            //this.contractcost.splice(h,1);
                            
                            player.credits += this.contractcost[h];
                            mouseP = true;
                        }
    }


}




/*
    []We want to return a array which contrains the location
    []what it has (resources and upgrades)
         req: you need to be able to esaly push teh array in the beginning
            - one array [ [x,y,s,r,g,b,id, [] ] ]
            -hubs.push(new Hub (x,y,s,d,f,s,d      ))

*/
//createHub(this.x,this.y,this.s);


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }






 