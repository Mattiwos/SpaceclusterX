class Map{
    constructor(){

    }
    drawMap(){
        this.mapsize=150;
        this.mx=width-100-this.mapsize;
        this.my=height-100;

        this.distanceconstant=0.08;

        
        
        fill(255,100);
        //t

        noStroke();
        ellipse(this.mx,this.my, this.mapsize, this.mapsize);

        fill(255,0,0); //shows where the user is on the map
        //noStroke();
        drawSpaceship(this.mx, this.my,player.r,false,5);
        // ellipse(this.mx, this.my, 10, 10);

        for(let i=0;i<oplayers.length;i++){

            fill(0);

            let distX = (oplayers[i].x - player.x) * this.distanceconstant ;
            let distY = (oplayers[i].y - player.y) * this.distanceconstant ;

            if(dist (this.mx+distX,this.my+distY,this.mx,this.my) <  this.mapsize/2 +10){

                drawSpaceship(this.mx + distX, this.my + distY,oplayers[i].r,false,5)

                textSize(10)
                fill(255)
                textAlign(CENTER);
                if (oplayers[i].name != undefined)
                text (oplayers[i].name,this.mx + distX, this.my + distY);
            }
        
   
            
            
        }


        
        //using this to test it

    }

    drawWorldMap(){
        this.mapsize=150;
        this.mx=width-100;
        this.my=height-100;

        this.distanceconstant=0.08;

        
        
        fill(255,50);
        //t

        noStroke();
        stroke(100);
        strokeWeight(2);
        ellipse(this.mx,this.my, this.mapsize, this.mapsize);
        // ellipse(this.mx, this.my, 10, 10);
        this.distanceconstant = this.mapsize/2 /worldsize;
        
        let distX = ( player.x) * this.distanceconstant ;
        let distY = ( player.y) * this.distanceconstant ;

        //drawSpaceship(this.mx + distX, this.my + distY,player.r,false,3)
        fill(150,0,0);
        noStroke();
        
        ellipse(this.mx + distX, this.my + distY, 5,5);
        if(dist (this.mx+distX,this.my+distY,this.mx,this.my) <  this.mapsize/2 +10){
        }
        
        //using this to test it

    }

}