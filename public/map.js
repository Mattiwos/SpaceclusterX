class Map{
    constructor(){}
    drawMap(){
        this.mx=width-80;
        this.my=height-80;

        this.distanceconstant=0.05;
        
        fill(255);

        noStroke();
        ellipse(this.mx,this.my,100,100);
        for(let i=0;i<oplayers.length;i++){

            fill(0);
            this.potentialx= oplayers[i].x- player.x + width/2 ;

            this.shiftx = width/2 - (this.potentialx);

            this.potentialx+=this.shiftx *this.distanceconstant;

            this.potentialy= oplayers[i].y- player.y + height/2 + m;

            this.shifty = height/2 + m - (this.potentialy);

            this.potentialy+=this.shifty *this.distanceconstant;

            print(this.potentialx+" "+ this.potentialy);
            
            ellipse( this.potentialx + (this.mx-width/2), this.potentialy + (this.my - (height/2+m) ), 10, 10);
            
        }

    }

}