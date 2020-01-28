function drawSpaceship(x,y,r){
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