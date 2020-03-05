class Map{
    constructor(){}
    drawMap(){
        this.mx=width-100;
        this.my=height-100;

        this.distanceconstant=0.08;

        this.mapsize=150;
        
        fill(255,100);

        noStroke();
        ellipse(this.mx,this.my, this.mapsize, this.mapsize);
        for(let i=0;i<oplayers.length;i++){

            fill(0);
            // this.potentialx= oplayers[i].x - player.x + width/2 ;

            // this.shiftx = width/2 - (this.potentialx);

            // this.potentialx += this.shiftx *this.distanceconstant;

            // this.potentialy= oplayers[i].y - player.y + height/2 + m;

            // this.shifty = height/2 + m - (this.potentialy);

            // this.potentialy+=this.shifty *this.distanceconstant;

            // print(this.potentialx+" "+ this.potentialy);


            let distX = (oplayers[i].x - player.x) * this.distanceconstant ;
            let distY = (oplayers[i].y - player.y) * this.distanceconstant ;

            if(dist (this.mx+distX,this.my+distY,this.mx,this.my) <  this.mapsize/2 +10)
            
            ellipse(this.mx + distX, this.my + distY, 10, 10);
            
        }
        //using this to test it

    }

}