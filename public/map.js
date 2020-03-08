class Map{
    constructor(){

    }
    drawMap(){
        this.mx=width-100;
        this.my=height-100;

        this.distanceconstant=0.08;

        this.mapsize=150;
        
        fill(255,100);

        noStroke();
        ellipse(this.mx,this.my, this.mapsize, this.mapsize);

        fill(255,0,0); //shows where the user is on the map
        ellipse(this.mx, this.my, 10, 10);

        for(let i=0;i<oplayers.length;i++){

            fill(0);

            let distX = (oplayers[i].x - player.x) * this.distanceconstant ;
            let distY = (oplayers[i].y - player.y) * this.distanceconstant ;

            if(dist (this.mx+distX,this.my+distY,this.mx,this.my) <  this.mapsize/2 +10)
        
            ellipse(this.mx + distX, this.my + distY, 10, 10);
            textSize(10)
            fill(255)
            if (oplayers[i].name != undefined)
            text (oplayers[i].name,this.mx + distX, this.my + distY);
            
        }
        //using this to test it

    }

}