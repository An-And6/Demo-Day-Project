//Collision detection and resolution
//move the mouse, the sprite responds to overlapings, collision,
//and displaces another sprite

        //VARIABLES
let jump = false; // are we jumping
let direction = 1; // force of gravity in the y direction
let velocity = 1; // speed of the player
let jumpPower = 16; // strength of player's jump
let fallingSpeed = 1; // equal to velocity
let minHeight = 00; // height of ground
let maxHeight = 0; // height of sky
let jumpCounter = 0; // keeps track of how much we are jumping
let jumpWatch=0; //how many times jump is true
let barrier; // stops character from falling through stuff
let state = 1;
let dy;
let iceS;
px = 150;
py = 50;
let gravity= 0.1;
let vy = 1.0;
let heart = 3;

let newIceB;
//let my =mouseY;
//let mx =mouseX;
        //SETUP

function preload() {
    // logo png
   // logo = loadImage();
   logo=loadImage('assets/Finished.png')
}

function setup() {
   const canvas= createCanvas(1000, 600);
   canvas.parent('gameImage');
    resetSketch();
    noStroke();
             
    }
function resetSketch(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

    // sprite creation
    bear = createSprite(400, 200,20,20);
    //compact way to add an image
    bear.addAnimation('forward','assets/bearX1.png','assets/bearX1.png','assets/bearY1.png','assets/bearY1.png');
    bear.addAnimation('normal','assets/bearX1.png');

    bear.addAnimation('left','assets/bearX.png');
    bear.addAnimation('backward','assets/bearX.png','assets/bearX.png','assets/bearY.png','assets/bearY.png');
    // ice sprite
   

    
    // ground sprite
    ground = createSprite(500, 850, 20, 20);
    ground.addImage(loadImage('assets/ground.png')); // replace with water 

    // baby cub sprite
    baby = createSprite(985, 278, 20, 20);

    baby.addImage(loadImage('assets/prime.png'));
    
    
   
    // heart sprites
    heart1 = createSprite(25, 25, 20, 20);
    heart1.addImage(loadImage('assets/heart.png'));
    heart2 = createSprite(75, 25, 20, 20);
    heart2.addImage(loadImage('assets/heart.png'));
    heart3 = createSprite(125, 25, 20, 20);
    heart3.addImage(loadImage('assets/heart.png'));

    // screen image
    loseScreen = loadImage('assets/lose.png');
    winScreen = loadImage('assets/dancing.gif');
    bg = loadImage('assets/background.png');

}
 

                //DRAW
function draw() {
    //console.log(bear.collide(ice));
    // start screen
    function iceP() {

        iceT[0].position.x=245;
        iceT[0].position.y=271;
        iceT[1].position.x=618;
        iceT[1].position.y=173;
        iceT[2].position.x=365;
        iceT[2].position.y=336;
        iceT[3].position.x=450;
        iceT[3].position.y=129;
        iceT[4].position.x=669;
        iceT[4].position.y=363;
        iceT[5].position.x=192;
        iceT[5].position.y=402;

        //top 
        iceD[6].position.x=245;
        iceD[6].position.y=281;
        iceD[7].position.x=618;
        iceD[7].position.y=183;
        iceD[8].position.x=365;
        iceD[8].position.y=346;
        iceD[9].position.x=450;
        iceD[9].position.y=139;
        iceD[10].position.x=669;
        iceD[10].position.y=373;
        iceD[11].position.x=192;
        iceD[11].position.y=412;

        iceB[0].position.x=281;
        iceB[0].position.y=156;
        iceB[1].position.x=892;
        iceB[1].position.y=119;
        iceB[2].position.x=739;
        iceB[2].position.y=198;
        iceB[3].position.x=488;
        iceB[3].position.y=282;
        iceB[4].position.x=988;
        iceB[4].position.y=297;
        iceB[5].position.x=846;
        iceB[5].position.y=246;

        //bottom
        iceD[0].position.x=281;
        iceD[0].position.y=166;
        iceD[1].position.x=892;
        iceD[1].position.y=129;
        iceD[2].position.x=739;
        iceD[2].position.y=208;
        iceD[3].position.x=488;
        iceD[3].position.y=292;
        iceD[4].position.x=988;
        iceD[4].position.y=307;
        iceD[5].position.x=846;
        iceD[5].position.y=256;
       

    }
    function bearP(){
        // position
        bear.position.x = px;
        bear.position.y = py;
        
        // controls
        if (keyIsDown(LEFT_ARROW)) {
            px -= 3;
        //image(rpolarBear,this.x,py,this.r);
        bear.changeImage('backward');
        }
        else{
          //  bear.changeImage('left')
        }
        //if(!(keyIsDown(LEFT_ARROW))){
           // bear.changeImage('left');
        // }
       
        if (keyIsDown(RIGHT_ARROW)) {
            px += 3;
            bear.changeImage('forward');
        }
        else{
           //bear.changeImage('normal');
        }
       
        if (!(keyIsDown(RIGHT_ARROW)||keyIsDown(LEFT_ARROW))){
            bear.changeImage('normal');
        }
            //bear.changeAnimation('normal');
       // }
        if (keyIsDown(UP_ARROW)) {
            jump = true;
            
        } 
        else {
            jump = false;
        } 
        if (keyIsDown(UP_ARROW) && bear.collide(ice)){
            jump=true;
            jumpWatch=0;
        }
        if(keyIsDown(UP_ARROW) && bear.collide(iceB)){
            jump = true;
            jumpWatch = 0;
        }
        if(keyIsDown(UP_ARROW) && bear.collide(iceT)){
            jump = true;
            jumpWatch = 0;
        }

        if(state==1||state==2||state==3||state==4){
            py+=4;
        }
       
        
        //console.log(jumpWatch);
    }
    function collision() {
        if(bear.collide(ice)){
            py -= barrier;
          //  ice.changeAnimation('melty')
        }
        if(bear.collide(ground)){
            py -= 6;
            heart -= 1;
            respawn();
            life();
            
        }
        if (bear.collide(baby)) {
            state = 5;
        }
        if(bear.collide(iceT)){
          //  py -= barrier;
            //py+=6;
        }
        if(bear.collide(iceB)){
          //  py -= barrier;
            //py+=6;
        }
        // collision for iceD
        if (bear.collide(iceD)) {
           py += 20;
        }

        

        
    }  
    function jumpObserver(){
        // jumpWatch=0;
        
        if (jump == true){
            jumpWatch += 1;
        }


        if (jumpWatch>8){
            jump=false;
           // jumpWatch=0
        }
        for(let i=0; i<6; i++){
        if (bear.collide(iceB[i])){
           
            py= iceB[i].position.y-10;
           // py= 5+iceB.position.y
           // barrier= vy+fallingSpeed-1;
          // barrier = 1;
            }
        }
        for(let i=0;i<6;i++){
            if(bear.collide(iceT[i])){
         //  for()
                py= iceT[i].position.y-10;
           
            //barrier=vy+fallingSpeed-1;
           // barrier=1;
            }
        }
        if (bear.collide(ice)){
          
           py= ice.position.y-10;
            //barrier=vy+fallingSpeed-1;
          //  barrier=1;
        }
        

    }
    function life() {
        if (heart == 0) {
            heart1.visible = false;
            // respawn
            // state = losing state
            state = 4;
        }   
        else if (heart == 2) {
            heart3.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce()
        }
        else if (heart == 1) {
            heart2.visible = false;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
            resetIce();
        }
    }
    function respawn() {
        px = 150;
        py = 25;

    }
    function gravity() {
        vy += gravity;
        bear.position.y += vy;
        vy = constrain(vy,1,3.9);
            if (py >= minHeight && jump == false){
                // stop falling on the ground
                py = py;
                jumpCounter = 0;
                
            } 
            else {
                py = py + (direction*velocity); // code that makes gravity work
                
            }
    
            if (jump == true) {
                if(py <= maxHeight || jumpCounter >= jumpPower) {
                    if (py >= minHeight) {
                        //py = minHeight;
                    }
                    else {
                        velocity = fallingSpeed;
                    }
                    velocity = fallingSpeed; // falls at max
                }
                else{
                    velocity = -jumpPower;
                    jumpCounter = jumpCounter + 1; // add to jump coutner
                }
            } // close jump
            else{
                velocity = fallingSpeed;
            }
    }
    function meltingIce(){  
            // if(py==ice.position.y-10){
            //     ice.changeImage('melty')
            //    ice.animation.frameDelay=20;
            // }
           
            // if(ice.animation.getFrame()===11){
            //     ice.removed=true;
            //     ice.position.x=5000;
            //     ice.position.y=5000;
             
            // }
            if(state==4 &&(ice.removed=true)){
                ice.changeImage('normal')
                //ice.removed=false;
                //ice.position.x=150;
               // ice.position.y=200;
            }
            
                 for(let i= 0; i<6; i++){
              if (py==iceT[i].position.y-10&&px>iceT[i].position.x-50&&px<iceT[i].position.x+50){
                  iceT[i].changeAnimation('melty');
                  iceT[i].animation.frameDelay=20;
              }
              if(iceT[i].animation.getFrame()===11){ 
                  iceT[i].removed=true;
                  iceT[i].position.x=5000;
                  iceT[i].position.y=5000;
                 // iceT[i].changeAnimation('normal');
              }
              if(state==4){
                iceT[i].changeAnimation('normal');
              
              }
              
             }
             for(let i=0; i<6;i++){
             if (py==iceB[i].position.y-10&&px>iceB[i].position.x-50&&px<iceB[i].position.x+50){
                     iceB[i].changeAnimation('melty');
                     iceB[i].animation.frameDelay=20;
             }
                if(iceB[i].animation.getFrame()===11){    
                  iceB[i].removed=true;
                  iceB[i].position.x=5000;
                  iceB[i].position.y=5000;
                //  iceB[i].changeAnimation('normal');
                }
                if(state==4){
                    iceB[i].changeAnimation('normal');
                             }
            }
        
             for(let i=0; i<12; i++){
                 if (py==iceD[i].position.y-20&&px>iceD[i].position.x-50&&px<iceD[i].position.x+50){
                    iceD[i].changeImage('melty');
                    iceD[i].animation.frameDelay=20;
                 }
                if(iceD[i].animation.getFrame()===11){    
                    iceD[i].removed=true;
                    iceD[i].position.x=5000;
                    iceD[i].position.y=5000;
                 //   iceD[i].changeImage('normal');
                }
              
                if(state==4){
                    iceD[i].changeImage('normal');
               
                 
                }
                
             }
            console.log(ice.removed);
    }
    function debug(){
        bear.debug = false// mouseIsPressed;
        ice.debug = false//mouseIsPressed;
        for(let i=0; i<6; i++){
        iceT[i].debug = false//mouseIsPressed;
        }
        for(let i=0; i<6; i++){
          iceB[i].debug = false//mouseIsPressed;
          }
          for(let i=0; i<12; i++){
              iceD[i].debug = false//mouseIsPressed;
                      }
      }
 //text('hmm',mouseX,mouseY);
    if (state == 1) {
      
        background(bg);
        textFont('Georgia');
        image(logo,420,150,175,100);
        textSize(15)
        text('AN',500,140)
        text('PRODUCTION',460,260);
            //background();
        // title button
        textSize(50);
        fill('blue');
        text('Polar Meltdown', 325, 100);
        // play button - go to state 3
        fill('red');
        rect(380, 300, 250, 75, 40);
        fill('black');
        text('PLAY', 440, 350);
        // how to play button - go to help state 
        fill('blue');
        rect(380, 420, 250, 75, 40);
        textSize(30);
        fill('black');
        text('HOW TO PLAY', 410, 470);
        // excursion button
       // image(logo, 400, 500, 50, 25, 40);   
    }
    // how to play
    if (state == 2) {
        background(bg);
        fill(0, 50, 255);
        textSize(35);
        textFont('Georgia');
        fill('black');
        text("YOUR OBJECTIVE IS TO GET TO YOUR", 185, 150);
        text("LOST CUB WHILE JUMPING ON ICE PLATFORMS ", 95, 220);
        text("BE CAREFUL FOR THE ICE MELTS BENEATH YOUR FEET", 20, 280)
        text("Up ARROW = JUMP, LEFT/RIGHT ARROW = LEFT/RIGHT", 20, 350);
        fill('blue');
        rect(200,400,250,75,40);
        fill('black');
        text('PLAY', 280, 450)
        fill('white');
        rect(550,400,250,75,40);
        fill('black');
        text('BACK',630,450);
    }
    // test stage
    if (state == 3) {
    fill(0, 0, 25);
    background(bg);
    fill(255,255,255);
    rect(862,18,100,50,20);
    fill(0)
    textSize(35);
    textFont('Georgia');
    text('EXIT',870,55);

   // image(backScreen,0,0,1000,600);
    gravity();
       
    
      //console.log(ice.animation.getFrame());
  
    
    // bear.stop();
    // player
    bearP();
    jumpObserver();
    collision();
    // health system
    // respawn location 
    // ice platforms
    iceP();
    //ice.animation('normal');
    meltingIce();  
  //if debug is set to true bounding boxes, centers and depths are visualized
  
//debug();
 // iceB[i].debug = true//mouseIsPressed
 // ground.debug = true// mouseIsPressed;

 
  drawSprites();    
    }
    // lose state
    if(state == 4) {
        background(loseScreen);
        fill(0, 120, 255);
        textSize(60);
        text('GAMEOVER!', 300, 100);
        textSize(25);
        text("Don't give up! Press down arrow to retry!", 300, 200)    
        
        iceP();
    
        ice.position.x=150;
        ice.position.y=200;
   //    ice.animation.looping=true;
        //ice.removed=false;
         
         
         if (keyIsDown(UP_ARROW)||keyIsDown(DOWN_ARROW)) {
            state = 3;
            for(let i=0; i<6; i++){
                iceT[i].removed = true//mouseIsPressed;
                }
                for(let i=0; i<6; i++){
                  iceB[i].removed = true//mouseIsPressed;
                  }
                  for(let i=0; i<12; i++){
                      iceD[i].removed = true//mouseIsPressed;
                  }
       
            // reset hearts back to 3
            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
            
            resetIce();
            
            //state = 3;
            
            
        }
    }   
     if(state == 5) {
        background(winScreen);
        fill(0, 120, 255);
        textSize(60);
        text('You WIN!', 300, 100);
        textSize(20);
        text("Press down arrow to play again!", 300, 200); 
        if (keyIsDown(DOWN_ARROW)||keyIsDown(UP_ARROW)) {
            state = 1;
            // reset hearts back to 3

            heart = 3;
            heart1.visible = true;
            heart2.visible = true;
            heart3.visible = true;
        }  
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
   // console.log((ice.position.x),(ice.position.y));
    // if(state ==6){
    //     fill(0, 0, 25);
    //     background(bg);

    //   drawSprites();    
    // }
}





function mouseClicked() {
    if (state==1 && mouseX>380 && mouseX<670 && mouseY>300 && mouseY<375) {
       state=3;
      
     
       heart = 3;
       heart1.visible = true;
       heart2.visible = true;
       heart3.visible = true;
       for(let i=0; i<6; i++){
           iceT[i].removed = true//mouseIsPressed;
           }
           for(let i=0; i<6; i++){
             iceB[i].removed = true//mouseIsPressed;
             }
             for(let i=0; i<12; i++){
                 iceD[i].removed = true//mouseIsPressed;
             }
             resetIce();
             px=120;
             py=25;
    }
    if(state==1 && mouseX>380 && mouseX<670&&mouseY>420&&mouseY<495){
        state=2;
    }
    if(state==2&& mouseX>200 && mouseX<450&&mouseY>400&&mouseY<475){
        state=3;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        px=120;
        py=25;
    }
    if(state==2&& mouseX>550 && mouseX<800&&mouseY>400&&mouseY<475){
        state=1;
    }
    if (state == 4) {
       state == 3;        
    }
    if(state==3&&mouseX>862&&mouseX<962&&mouseY>18&&mouseY<68){
        state=1;
        heart = 3;
        heart1.visible = true;
        heart2.visible = true;
        heart3.visible = true;
        for(let i=0; i<6; i++){
            iceT[i].removed = true//mouseIsPressed;
            }
            for(let i=0; i<6; i++){
              iceB[i].removed = true//mouseIsPressed;
              }
              for(let i=0; i<12; i++){
                  iceD[i].removed = true//mouseIsPressed;
              }
        resetIce();
        respawn();
    }
}

function resetIce(){
    iceT = new Group(); // top part
    iceB = new Group(); // bottom part
    iceD = new Group(); // portion of the ice that pushes the player down
    
    // for loop for platforms
    for(let i = 0; i < 6; i++) {
        let newIceT = createSprite(random(0, width), random(0, height));
        newIceT.addImage(loadImage('assets/iceF1.png'));
        newIceT.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceT.add(newIceT);
    }
    for(let i = 0; i < 6; i++) {
        let newIceB = createSprite(random(0, width), random(0, height));
        newIceB.addImage(loadImage('assets/iceF1.png'));
        newIceB.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        iceB.add(newIceB);
    }
    for(let i = 0; i < 12; i++) {
        let newIceD = createSprite(random(0, width), random(0, height));
        newIceD.addAnimation('normal','assets/iceF1.png')
        newIceD.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');
        //newIceD1.addAnimation('melty','assets/iceF1.png','assets/ice1.Png','assets/ice2.png','assets/ice3.png','assets/ice4.png','assets/ice5.png');
        iceD.add(newIceD);
       // iceD.add(newIceD1)=false;
    }
    ice = createSprite(150, 200);
    ice.addAnimation('normal','assets/iceF1.png');
    ice.addAnimation('melty','assets/iceF1.png','assets/iceF1.png','assets/ice1.Png','assets/ice1.Png','assets/ice2.png','assets/ice2.Png','assets/ice3.Png','assets/ice3.png','assets/ice4.png','assets/ice4.Png','assets/ice5.png','assets/ice5.Png','assets/ice6.png','assets/ice6.Png');

}

function newStage(){
    
}