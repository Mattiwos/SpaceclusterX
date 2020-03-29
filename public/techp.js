var techNames=["Storage Bay","Flank Gun","Sentry Turret","Stronger Engine","Shielding System","Radar System","Missle Launcher","Repair System"];
var techCost=[4,15,10,5,12,10,15,20];
var techResources=[
    [6,3],
    [1,4,5],
    [2,5,6],
    [1,2],
    [2,3,6],
    [1,3,4],
    [2,4,5,6],
    [2,4]
];
var amountOfTechResources=[6,10,12,5,8,5,25,14];

//resource index
// yellow , blue , green , purple , red , brown
//circle , square , triangle , diamond ,star , brown blocks




class techHub{

    constructor(x,y){
        this.x=x;
        this.y=y;

        this.tech = floor (noise (this.x,this.y,1) * techNames.length );
        // could have up to 2 extra resources , decrease cost by two for each
        this.extraResources = floor (noise (this.x,this.y,2) *2 );
        this.size=100;
        this.popup=0;
        this.windowsize=100;
    }
    draw(){
        push ();
        translate(-player.x,-player.y);
        fill (200);
        ellipse(this.x,this.y,this.size,this.size);

        if (dist(this.x, this.y, player.x, player.y) < this.citysize / 2 + 30) {
            if(this.popup<100)this.popup++;
        }else this.popup=0;

        if(this.popup>0){
        rectAlign (CORNER);
            rect(this.x- this.windowsize/2 * (this.popup/100),
            this.y - this.windowsize/4 * (this.pop/100) - this.windowsize/4,
            this.windowsize * this.popup/100
            , this.windowsize /2 *this.popup/100);
       // rectAlign (C)

        }
        pop ();

    }
}