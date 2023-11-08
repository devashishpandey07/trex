var trex,trex_running,trex_collided
var ground, groundimg, invisibleground
var cloud,cloudimg,cloudgroup
var obstacle,obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclegroup
var score=0
var gameover, gameoverimg
var restart, restartimg
var gamestate="play"
var jumpsound,diesound,checkpointsound
function preload(){
    trex_running=loadAnimation("assetbw/trex1.png","assetbw/trex2.png","assetbw/trex3.png",)
    trex_collided=loadAnimation("assetbw/trex_collided.png")
    groundimg=loadImage("assetbw/ground2.png")
    cloudimg=loadImage("assetbw/cloud.png")
    obstacle1=loadImage("assetbw/obstacle1.png")
    obstacle2=loadImage("assetbw/obstacle2.png")
    obstacle3=loadImage("assetbw/obstacle3.png")
    obstacle4=loadImage("assetbw/obstacle4.png")
    obstacle5=loadImage("assetbw/obstacle5.png")
    obstacle6=loadImage("assetbw/obstacle6.png")
    gameoverimg=loadImage("assetbw/gameOver.png")
    restartimg=loadImage("assetbw/restart.png")
    jumpsound=loadSound("assetbw/jump.mp3")
    diesound=loadSound("assetbw/die.mp3")
    checkpointsound=loadSound("assetbw/checkpoint.mp3")
}

function setup(){
createCanvas(600,200)
trex=createSprite(50,180,20,20)
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale=0.5

ground=createSprite(200,180,400,20)
ground.addImage(groundimg)
invisibleground=createSprite(200,190,400,10)
invisibleground.visible=false
obstaclegroup=new Group()
cloudgroup=new Group()
trex.debug=false
gameover=createSprite(300,100)
gameover.addImage(gameoverimg)
gameover.scale=0.5
gameover.visible=false
restart=createSprite(300,140)
restart.addImage(restartimg)
restart.scale=0.5
restart.visible=false
}

function draw(){
background(255)
drawSprites()
textSize(15)
fill(0)
text("score:"+score,50,20)
console.log(trex.y)
if (gamestate==="play"){
    ground.velocityX=-(4+score/100)
    score+=1
    if (score>0 && score%100===0){
        //checkpointsound.play()
    }
if (ground.x<0){
    ground.x=ground.width/2
        
    }
if (keyDown("space")&& trex.y>161){
    trex.velocityY=-12
    //jumpsound.play()
    }
    trex.velocityY+=0.5
    spawnclouds()
    spawnobstacles()
if (obstaclegroup.isTouching(trex)){
    gamestate="end"
    //diesound.play()
}
}

else if(gamestate==="end"){
ground.velocityX=0
obstaclegroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided)
obstaclegroup.setLifetimeEach(-1)
cloudgroup.setLifetimeEach(-1)
trex.velocityY=0
gameover.visible=true
restart.visible=true
if (mousePressedOver(restart)){
    reset()


}
}

trex.collide(invisibleground)
    }

function spawnclouds(){
    if (frameCount%60===0){
    cloud=createSprite(600,100,40,10)
    cloud.velocityX=-3
    cloud.y=random(10,100)
    cloud.addImage(cloudimg)
    cloud.scale=0.6
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime=600/3
    cloudgroup.add(cloud)
    }
}
function spawnobstacles(){
    if (frameCount%60===0){
        obstacle=createSprite(600,165,10,40)
        obstacle.velocityX=-(4+score/100)
        var ran=Math.round(random(1,6))
        switch(ran){
            case 1:obstacle.addImage(obstacle1)
            break
            case 2:obstacle.addImage(obstacle2)
            break
            case 3:obstacle.addImage(obstacle3)
            break
            case 4:obstacle.addImage(obstacle4)
            break
            case 5:obstacle.addImage(obstacle5)
            break
            case 6:obstacle.addImage(obstacle6)
            break
        }
        obstacle.scale=0.5
        obstacle.lifetime=600/4
        obstaclegroup.add(obstacle)
    }
}
function reset(){
    gamestate="play"
    score=0
    gameover.visible=false
    restart.visible=false
    obstaclegroup.destroyEach()
    cloudgroup.destroyEach()
    trex.changeAnimation("running",trex_running)
}