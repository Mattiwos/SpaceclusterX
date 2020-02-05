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
    if(resource==1){

        ellipse(x,y,10*sc,10*sc);
    }
}