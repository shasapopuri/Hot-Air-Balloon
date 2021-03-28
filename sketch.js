var balloon,balloonImg;
var backgroundImg;
var Database;
var balloonPosition;
var position;
var height;

function preload(){
  balloonImg=loadImage("parachute.png");
  backgroundImg=loadImage("city.jpg")
}
function setup() {
  createCanvas(500,500);
  Database = firebase.database();
 balloonPosition=Database.ref('balloon')
  balloonPosition.on("value",showError,function(data){
    position=data.ref()
  })
   
 balloon= createSprite(200, 200, 50, 50);
 balloonImg.resize(70,70);
 balloon.addImage(balloonImg)

}

function draw() {
  background(backgroundImg);
  if (keyDown(LEFT_ARROW)) {
    balloon.x = balloon.x -10;
  }else if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x +10
  }else if (keyDown(UP_ARROW)) {
    //updateHeight(0,-10);
    balloon.addImage(balloonImg)
    balloon.y = balloon.y -10;
    balloon.scale=balloon.scale-0.01
  }else if (keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y +10;
    balloon.addImage(balloonImg);
    balloon.scale=balloon.scale+0.01
  }

  //balloon=image(balloonImg);

  drawSprites();
}

function updateHeight(x,y) {
  Database.ref('balloon').set({
   'x': height.x + x ,
   'y': height.y + y

  })
}

function readHeight(data) {
  height= data.val();

 balloon.x=height.x;
 balloon.y=height.y;
  
}

function showError() {
  console.log("Error in writting to the database");
}