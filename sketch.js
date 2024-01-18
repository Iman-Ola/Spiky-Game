var PLAY = 1;
var END = 0;
var gameState = PLAY;

var square
var invisibleGround
var spike, spikeImg, spikeGroup
var gameOver, gameOverimg
var reset, resetimg
var score = 0

function preload(){
spikeImg = loadImage("spike2.png");
gameOverimg = loadImage("gameover.png");
resetimg = loadImage("reset.png");
}

function setup() {
createCanvas(400,400);
square = createSprite(50,150);
square.scale = 0.5;

gameOver = createSprite(200,200);
gameOver.addImage(gameOverimg);
gameOver.scale = 0.4
gameOver.visible = false;

reset = createSprite(200,350);
reset.addImage(resetimg);
reset.scale = 0.05 
reset.visible = false;

spikeGroup = new Group();

}

function draw() {
background(72);
text("Score: "+score,40,25);
if(keyDown("space")){
 square.velocityY = -10
}

if(keyDown("right_arrow")) {
square.x = square.x  +10
}

if(keyDown("left_arrow")) {
square.x = square.x  -10
}
 
if(spikeGroup.isTouching(square)){
  gameState = END
}

if(square.position.x<=0 || square.position.x>=400 ){
  gameState = END
}
       
if(square.position.y>=400 || square.position.y<=0 ) {
  gameState = END
}

if (gameState === PLAY) {
square.velocityY = square.velocityY + 0.75   
spawnSpike();
score = score + Math.round(getFrameRate()/60);
}
else if(gameState === END) {
  square.visible = false
  gameOver.visible = true; 
  reset.visible = true;
  if(mousePressedOver(reset)) {
    resetart();
  }
}
 drawSprites();
}

function spawnSpike() {
    if (frameCount % 40 === 0) {
      var spike = createSprite(600,80,40,10);
      spike.x = Math.round(random(10,400));
      spike.addImage(spikeImg);
      spike.scale = 0.1 ;
      spike.velocityY = 6;
      
      spike.lifetime = 200;
      
      spikeGroup.add(spike);
    }
    
  }

  function resetart() {
    gameState = PLAY
    square.visible = true
    square.x = 300
    gameOver.visible = false;
    reset.visible = false;
  }
