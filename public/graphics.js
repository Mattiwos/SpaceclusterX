function drawGraphics(){


    textSize(22);
    text("X: " + (player.x | 0 )+" Y: "+ (player.y | 0), width*0.8,height*0.9);
    
    
    stroke(255,0,0,100);
    strokeWeight(10);
    noFill();
    rect(width/2-100,height/50,200,30);
    fill(200,0,0,255);
    noStroke();
    strokeWeight(0);
    rect(width/2-100+5,height/50+5,player.health*190/100,20);

    
    stroke(100,100,0,100);
    strokeWeight(10);
    noFill();
    rect(width/2-100,4*height/50,200,30);
    fill(50,50,0,255);
    noStroke();
    strokeWeight(0);
    rect(width/2-100+5,4*height/50+5,player.ammo*190/100,20);

    fill (0,0,0,190);
    //fill(0);
    noStroke();
    rect (0,height,width,m*2);
    //rect()
    fill(255,255,255,20);
    //fill(255,0,0);
    //fill(255,0,0,100);
    noStroke();
    fill(255,255,255,20);
    rect(width/2 - player.storage * storagewidth / 2 - 10, height + m*1.7 - 10,
        player.storage *storagewidth +20,storagewidth+20);
        fill(255,255,255,40);
    rect(width/2 - player.storage * storagewidth / 2, height + m*1.7,
         player.storage *storagewidth,storagewidth);

    
        textSize(30);
        fill(255);
        stroke(200);
        strokeWeight(2);
        text("¢"+player.displaycredits,width/10,height+m);

    for(let i=0;i<player.cargobay.length;i++){
        if(player.cargostate[i]<=0&&player.cargostate[i]>-100)
        drawResource(width/2 - player.storage * storagewidth / 2 +storagewidth/2  +storagewidth*i, height + m*1.15,
            player.cargobay[i],4);
            else if (player.cargostate[i]>0){

                drawResource(
                    width/2 - player.storage * storagewidth / 2 +storagewidth/2  +storagewidth*i 
                    +(width/2- (width/2 - player.storage * storagewidth / 2 +storagewidth/2  +storagewidth*i))*player.cargostate[i]/100, 

                    height + m *1.15 - player.cargostate[i]*height/2/100,
                    //

                    
                    player.cargobay[i],4*(100-player.cargostate[i])/100);
                    player.cargostate[i]-=8;
            }else{
                drawResource(
                    width/2 - player.storage * storagewidth / 2 +storagewidth/2  +storagewidth*i 
                    +(width/2- (width/2 - player.storage * storagewidth / 2 +storagewidth/2  +storagewidth*i))*-1*(player.cargostate[i]+100)/100, 

                    height + m *1.15 - (-1*(player.cargostate[i]+100)*height/2/100),
                    //

                    
                    player.cargobay[i],4*-1*(((-200-player.cargostate[i])/100) ));
                    player.cargostate[i]-=8;
                    if(player.cargostate[i]<-200){
                        player.cargobay.splice(i,1);
                        player.cargostate.splice(i,1);
                        //break;
                    }
            }
    }

}

function drawResource(x,y,resource,sc){
    //sc = scale factor
    noStroke();

    //yellow circle
    if(resource==1){
        fill(100,100,0);
        
        noFill();
        
        for(let u=8;u>0;u--){
            strokeWeight(u*sc+3);
            stroke(100,100,0);
            stroke(255-20*u,255-20*u,0);
            noStroke();
            fill(255-20*u,255-20*u,0);
            ellipse(x,y,u*sc,u*sc);
        }
        
    }
    //blue square
    if(resource==2){
        fill(0,0,200);
        rect(x-(8*sc)/2,y-(8*sc)/2,8*sc,8*sc);
        fill(0,0,100);
        rect(x-sc,y-sc*4,sc*2,sc*8);
        rect(x-sc*4,y-sc,sc*8,sc*2);
    }

    //green triangle
    if(resource==3){
        fill(0,200,0);
        triangle(x,y+5*sc,
            x-5*sc*sqrt (3)/2, y - 5*sc/2,
            x+5*sc*sqrt (3)/2 , y - 5 *sc/2);
        fill(0,100,0);
        triangle(x,y+3*sc,
            x-3*sc*sqrt (3)/2, y - 3*sc/2,
            x+3*sc*sqrt (3)/2 , y - 3 *sc/2);
    }


    //pink diamond

    if(resource==4){
        fill(200,50,150);
        sc=sc*0.7;
        beginShape();
        vertex(x,y);
        vertex(x-8*sc,y);
        vertex(x-2*sc,y-2*sc);
        vertex(x,y-8*sc);
        endShape();

        fill(150,37,150);

        beginShape();
        vertex(x,y);
        vertex(x+8*sc,y);
        vertex(x+2*sc,y-2*sc);
        vertex(x,y-8*sc);
        endShape();

        fill(200,50,150);

        beginShape();
        vertex(x,y);
        vertex(x+8*sc,y);
        vertex(x+2*sc,y+2*sc);
        vertex(x,y+8*sc);
        endShape();

        fill(150,37,150);

        beginShape();
        vertex(x,y);
        vertex(x-8*sc,y);
        vertex(x-2*sc,y+2*sc);
        vertex(x,y+8*sc);
        endShape();
    }

    //red star
    if(resource==5){
        sc=sc*0.9;
        fill(255,0,0);
        for(let i=0;i<2*PI;i+=PI/8){
            triangle(x+2*sc*cos (i+PI/2),y+2*sc*sin (i+PI/2),
            x+2*sc*cos (i-PI/2),y+2*sc*sin (i-PI/2),

            x+7*sc*cos (i),y+7*sc*sin (i),
            
            );
        }

        sc=sc*0.6;
        fill(255,100,100);
        for(let i=PI/16;i<2*PI+PI/16;i+=PI/8){
            triangle(x+2*sc*cos (i+PI/2),y+2*sc*sin (i+PI/2),
            x+2*sc*cos (i-PI/2),y+2*sc*sin (i-PI/2),

            x+6*sc*cos (i),y+6*sc*sin (i),
            
            );
        }
    }

    if(resource==6){
        fill(100,50,0);
        rect(x-sc*4,y-sc*4,sc*8,sc*3);
        rect(x-sc*4,y+sc*1,sc*8,sc*3);
    }
}