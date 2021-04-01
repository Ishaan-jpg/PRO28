
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1;
var world,boy;
var stoneObj
var launcher

var gameState = "onSling";

function preload(){
	boy=loadImage("images/boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(1100,200,30);
	mango3=new mango(900,200,30);
	mango4=new mango(990,116,30);
	mango5=new mango(980,209,30);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);
	stoneObj= new Stone (400,400,30);
	launcher = new Launch(stoneObj.body,{x:245, y:410})
	Engine.run(engine);

}

function draw() {

  background(230);
  //Add code for displaying text here!
  image(boy ,200,340,200,300);
  if(gameState === "launched"){
	textSize(20)
	text("Press Space to Get One More Chance to Play", 100, 60)
	
  }
  
  detectcollison(stoneObj,mango1)
  detectcollison(stoneObj,mango2)
  detectcollison(stoneObj,mango3)
  detectcollison(stoneObj,mango4)
  detectcollison(stoneObj,mango5)
 launcher.display();
  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  stoneObj.display();
  groundObject.display();
  //console.log(gameState)

}
function mouseDragged(){
    
        Matter.Body.setPosition(stoneObj.body, {x: mouseX , y: mouseY});
        
   
}
function mouseReleased(){
    launcher.fly();
	
    gameState = "launched";
}
function keyPressed(){
	if (keyCode === 32){
		Matter.Body.setPosition(stoneObj.body, {x:245, y:410})
		launcher.attach(stoneObj.body)
	}
}
function detectcollison(lstone,lmango){
	mangoBodyPosition=lmango.body.position
	stoneBodyPosition=lstone.body.position

	var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y ,mangoBodyPosition.x ,mangoBodyPosition.y)
	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body,false);
	}
}