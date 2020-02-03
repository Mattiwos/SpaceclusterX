function drawSpaceship(x,y,r,fire){

   if(fire){
      fill(0,0,200,random(0,100));
      noStroke();
      ellipse(x+1.2*radius*cos(r+PI),y+1.2*radius*sin(r+PI),30,30);
      ellipse(x+radius*cos(r+PI),y+radius*sin(r+PI),20,20);
   }

   fill(100);
    stroke(180);
    strokeWeight(2);

    beginShape();
    vertex(  x-radius*cos(r) + radius/3 * cos(r+PI/2)  ,
             y-radius*sin(r) + radius/3 *sin(r+PI/2)
          );
    vertex(  x-radius*cos(r) - radius/3 * cos(r+PI/2)  ,
             y-radius*sin(r) - radius/3 *sin(r+PI/2)
          );
    vertex(  x+radius*cos(r) - radius/3 * cos(r+PI/2)  ,
             y+radius*sin(r) - radius/3 *sin(r+PI/2)
          );
     vertex(  x+radius*1.4*cos(r),
             y+radius*1.4*sin(r)
          );
    vertex(  x+radius*cos(r) + radius/3 * cos(r+PI/2)  ,
             y+radius*sin(r) + radius/3 *sin(r+PI/2)
          );
    vertex(  x-radius*cos(r) + radius/3 * cos(r+PI/2)  ,
             y-radius*sin(r) + radius/3 *sin(r+PI/2)
          );
    endShape();
    
    beginShape();
    vertex(  x-radius*cos(r) + radius/3 * cos(r+PI/2)  ,
             y-radius*sin(r) + radius/3 *sin(r+PI/2)
          );
    vertex(  x-radius*1.2*cos(r) + radius/2 * cos(r+PI/2)  ,
             y-radius*1.2*sin(r) + radius/2 *sin(r+PI/2)
          );
    vertex(  x-radius*0.8*cos(r) + radius/3 * cos(r+PI/2)  ,
             y-radius*0.8*sin(r) + radius/3 *sin(r+PI/2)
          );
    endShape();
    
    beginShape();
    vertex(  x-radius*cos(r) - radius/3 * cos(r+PI/2)  ,
             y-radius*sin(r) - radius/3 *sin(r+PI/2)
          );
    vertex(  x-radius*1.2*cos(r) - radius/2 * cos(r+PI/2)  ,
             y-radius*1.2*sin(r) - radius/2 *sin(r+PI/2)
          );
    vertex(  x-radius*0.8*cos(r) - radius/3 * cos(r+PI/2)  ,
             y-radius*0.8*sin(r) - radius/3 *sin(r+PI/2)
          );
    endShape();
  
  
  
  
  }