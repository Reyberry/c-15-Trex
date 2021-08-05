var trex , trex_running, edges,trex_collided;
var groundImage;
var cloud,cloudImage,cloudsGroup;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload (){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collided = loadImage ("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
}
function setup() 
{
  createCanvas(400,200);
trex = createSprite(150,150,20,50);
trex.addAnimation ("running", trex_running);


score = 0;

edges = createEdgeSprites();

trex.scale = 0.5;
trex.x = 50;


ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2; //x = 20;
ground.velocityX = -4


invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;


obstaclesGroup = createGroup();
cloudsGroup = createGroup();

}

function draw() 
{
background("pink");



text("Score = "+score,300,20);
if (gameState === PLAY) {

score = score + Math.round(frameCount/60);
//console.log(trex.y);
if (keyDown("space")&& trex.y >=100) {
trex.velocityY=-10;
}
trex.velocityY=trex.velocityY + 0.8;

if (ground.x < 0) {
 ground.x = ground.width / 2;
}



spawnClouds()
spawnObstacles()
if(obstaclesGroup.isTouching(trex)){
gameState = END;
}
}
  else if (gameState === END) {
     ground.velocityX = 0;
 obstaclesGroup.setVelocityXEach (0);
 cloudsGroup.setVelocityXEach (0);
  }
trex.collide(invisibleGround);
console.log(frameCount)

drawSprites();


}
function spawnClouds() {
if(frameCount % 60 === 0){
cloud = createSprite(600,100,40,10)
cloud.y= Math.round(random(10,60));
cloud.addImage(cloudImage);
cloud.scale=0.1;
cloud.velocityX = -3
cloud.lifetime = 200;
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
cloudsGroup.add(cloud);
}
}


function spawnObstacles(){
if (frameCount % 60 === 0){
var obstacle = createSprite(100,165,10,40);
obstacle.velocityX = -6;



var  rand = Math.round(random(1,6));


switch(rand){

  case 1: obstacle.addImage(obstacle1);
        break;
  case 2: obstacle.addImage(obstacle2);
        break;
  case 3: obstacle.addImage(obstacle3);
        break;
  case 4: obstacle.addImage(obstacle4);
        break;
  case 5: obstacle.addImage(obstacle5);
        break;
  case 6: obstacle.addImage(obstacle6);
        break;
  default: break;
}
obstacle.scale = 0.1;
obstacle.lifetime = 300;
obstaclesGroup.add(obstacle);
}
}