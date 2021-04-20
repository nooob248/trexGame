var trex, trex_running, trex_collided, trexCollided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloudGroup, cloudImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count=0;
var gameOver, gameOverImg;
var restart, restartImg;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.55;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6+3*count/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100,30,30);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale=0.55;
  gameOver.visible=false;
  
  restart = createSprite(300,150,10,10);
  restart.addImage("restart", restartImg);
  restart.scale=0.5;
  restart.visible=false;
  
  
  obstaclesGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  background("white");
  count=count+Math.round(getFrameRate()/60);
  text("Score: "+ count, 450, 60);
  if(gameState===PLAY){
    
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnObstacles();
  spawnClouds();
  if(trex.isTouching(obstaclesGroup)){
    gameState=END;
  }
  }
  else if(gameState===END){
    restart.visible=true;
    gameOver.visible=true;
      
    //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
    reset();
  }
    
}
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,165,10,40);
    
    //obstacle.velocityX = -(6+3*count/100);
    obstacle.velocityX=-(6+3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
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
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  if(frameCount % 60===0) {
    var cloud = createSprite(600,100,50,10);
    cloud.y = Math.round(random(50,100));
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX = -3;
    cloud.lifetime=300;
    cloud.depth = trex.depth;
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);
  }
}
function reset(){
  count=0;
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  ground.velocityX=-(6+3*count/100);
}