function drawGraphics(){


    textSize(22);
    text("X: " + (player.x | 0 )+" Y: "+ (player.y | 0), width*0.8,height*0.9);
    
    
    fill (0,0,0,190);
    //fill(0);
    noStroke();
    rect (0,height,width,m*2);
    //rect()
    fill(255,100);
    rect(width/2 - player.storage * storagewidth / 2, height + m*1.7,
         player.storage *storagewidth,storagewidth);

    rect(width/2 - player.storage * storagewidth / 2 - 10, height + m*1.7 - 10,
         player.storage *storagewidth +20,storagewidth+20);

        textSize(30);
        fill(255);
        stroke(200);
        strokeWeight(2);
        text("¢"+player.credits,width/10,height+m);

}

function drawResource(x,y,resource,sc){
    //sc = scale factor
    noStroke();

    //yellow circle
    if(resource==1){
        fill(100,100,0);
        ellipse(x,y,8*sc,8*sc);
    }
    //blue square
    if(resource==2){
        fill(0,0,200);
        rect(x-(8*sc)/2,y-(8*sc)/2,8*sc,8*sc);
    }

    //green triangle
    if(resource==3){
        fill(0,200,0);
        triangle(x,y+5*sc,
            x-5*sc*sqrt (3)/2, y - 5*sc/2,
            x+5*sc*sqrt (3)/2 , y - 5 *sc/2);
    }


    //pink diamond

    if(resource==4){
        fill(200,50,150);
        
        beginShape();
        vertex(x,y);
        vertex(x-8*sc,y);
        vertex(x-2*sc,y-2*sc);
        vertex(x,y-8*sc);
        endShape();

        beginShape();
        vertex(x,y);
        vertex(x+8*sc,y);
        vertex(x+2*sc,y-2*sc);
        vertex(x,y-8*sc);
        endShape();

        beginShape();
        vertex(x,y);
        vertex(x+8*sc,y);
        vertex(x+2*sc,y+2*sc);
        vertex(x,y+8*sc);
        endShape();

        beginShape();
        vertex(x,y);
        vertex(x-8*sc,y);
        vertex(x-2*sc,y+2*sc);
        vertex(x,y+8*sc);
        endShape();
    }
}