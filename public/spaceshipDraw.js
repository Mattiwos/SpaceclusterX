function drawSpaceship(x,y,r,fire,size = 20){
   this.r = size;

   if(fire){
      fill(0,0,200,random(0,100));
      noStroke();
      ellipse(x+1.2*this.r*cos(r+PI),y+1.2*this.r*sin(r+PI),30,30);
      ellipse(x+this.r*cos(r+PI),y+this.r*sin(r+PI),20,20);
   }

   fill(100);
    stroke(180);
    strokeWeight(2);

    beginShape();
    vertex(  x-this.r*cos(r) + this.r/3 * cos(r+PI/2)  ,
             y-this.r*sin(r) + this.r/3 *sin(r+PI/2)
          );
    vertex(  x-this.r*cos(r) - this.r/3 * cos(r+PI/2)  ,
             y-this.r*sin(r) - this.r/3 *sin(r+PI/2)
          );
    vertex(  x+this.r*cos(r) - this.r/3 * cos(r+PI/2)  ,
             y+this.r*sin(r) - this.r/3 *sin(r+PI/2)
          );
     vertex(  x+this.r*1.4*cos(r),
             y+this.r*1.4*sin(r)
          );
    vertex(  x+this.r*cos(r) + this.r/3 * cos(r+PI/2)  ,
             y+this.r*sin(r) + this.r/3 *sin(r+PI/2)
          );
    vertex(  x-this.r*cos(r) + this.r/3 * cos(r+PI/2)  ,
             y-this.r*sin(r) + this.r/3 *sin(r+PI/2)
          );
    endShape();
    
    beginShape();
    vertex(  x-this.r*cos(r) + this.r/3 * cos(r+PI/2)  ,
             y-this.r*sin(r) + this.r/3 *sin(r+PI/2)
          );
    vertex(  x-this.r*1.2*cos(r) + this.r/2 * cos(r+PI/2)  ,
             y-this.r*1.2*sin(r) + this.r/2 *sin(r+PI/2)
          );
    vertex(  x-this.r*0.8*cos(r) + this.r/3 * cos(r+PI/2)  ,
             y-this.r*0.8*sin(r) + this.r/3 *sin(r+PI/2)
          );
    endShape();
    
    beginShape();
    vertex(  x-this.r*cos(r) - this.r/3 * cos(r+PI/2)  ,
             y-this.r*sin(r) - this.r/3 *sin(r+PI/2)
          );
    vertex(  x-this.r*1.2*cos(r) - this.r/2 * cos(r+PI/2)  ,
             y-this.r*1.2*sin(r) - this.r/2 *sin(r+PI/2)
          );
    vertex(  x-this.r*0.8*cos(r) - this.r/3 * cos(r+PI/2)  ,
             y-this.r*0.8*sin(r) - this.r/3 *sin(r+PI/2)
          );
    endShape();
  
  
  
  
  }