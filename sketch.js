var tower, towerimage;

var ghost, ghostimage;

var door, doorimage, doorgroup;

var climber,climberimage, climbergroup;

var invisibleBlockGroup, invisibleBlock;

var spookysound;

var gamestate="play";

function preload(){

towerimage = loadImage("tower.png");

ghostimage = loadImage("ghost-standing.png")
  
 doorgroup = new Group()
  doorimage = loadImage("door.png");
  
  climbergroup = new Group()
  climberimage = loadImage("climber.png");
  
  invisibleBlockGroup = new Group();
  
  spookysound=loadSound("spooky.wav")
}

function setup(){
  
  createCanvas(600,600);
  
  spookysound.loop();
  
  tower = createSprite(300,300,100,120);
  tower.addImage("TOWER",towerimage)
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,100,120);
  ghost.addImage("GHOST",ghostimage);
  ghost.scale = 0.3;
}



function draw(){
  
  
  background("black");
  
  if(gamestate==="play"){
  
  if(tower.y>400){
    
    tower.y=300;
    
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x=ghost.x+3;
    
  }
  
   if(keyDown("left_arrow")){
    
    ghost.x=ghost.x-3;
    
  }
  
  if(keyDown("space")){
    
    ghost.velocityY=-5;
    
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  
  if(climbergroup.isTouching(ghost)){
    
    ghost.velocityY=0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy(); 
    gamestate="end";
  }
  
  SpawnDoors();
  
  drawSprites()
  }
  if (gamestate === "end"){
  stroke("yellow"); 
   fill("yellow"); 
   textSize(30); 
   text("Game Over", 230,250) }
}
function SpawnDoors(){
  
  if(frameCount%250===0){
    
    
    door=createSprite(200,0,50,50);
    climber=createSprite(200,70,50,50);
    door.addImage("DOOR",doorimage);
    climber.addImage("CLIMBER",climberimage);
    door.x=Math.round(random(150,400));
    climber.x=door.x;
    door.velocity.y=2;
    climber.velocity.y=2;
    door.lifetime=600;
    climber.lifetime = 600;
    climbergroup.add(climber);
    doorgroup.add(door)
    ghost.depth=door.depth;
    ghost.depth = ghost.depth+1
    
var invisibleBlock = createSprite(200,70); invisibleBlock.width = climber.width; invisibleBlock.height = 2;
    
    invisibleBlock.x = door.x; invisibleBlock.velocityY = 2;
    
    invisibleBlock.debug = true; invisibleBlockGroup.add(invisibleBlock);

    
    
  }
}