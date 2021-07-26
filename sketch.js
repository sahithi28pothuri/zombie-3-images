const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var g1,g2;
var link;
var stone,stoneImg;
var stones=[];
var zombie,zombieImg;
var bg;
var button,axe;
function preload(){
  zombieImg=loadImage("./pics/zombie.png");
  bg=loadImage("./pics/background.png");
  axe=loadImage("./pics/axe.png");
  stoneImg=loadImage("./pics/stone.png");
}
function setup() {
  createCanvas(1500,700);
  engine = Engine.create();
  world = engine.world;

  frameRate(80);
  bridge=new Bridge(9,{x:370,y:450});
  g1=new Ground(200,400,600,300)
  g2=new Ground(1350,400,600,300)
  link=new Link(bridge,g2);
  Matter.Composite.add(bridge.body,g2)
  stone = Bodies.circle(300,300,15,{density:0.001});
  //stone.addImage("stone",stoneImg);

  for (var i = 0; i <= 8; i++) 
  {  var x = random(width / 2 - 200, width / 2 + 300);
     var y = random(-10, 140); 
     var stone = new Stone(x, y, 25); 
     stones.push(stone);
  }

  zombie=createSprite(700,590);
  zombie.addImage("zombie",zombieImg);
  zombie.scale=0.2;

  button = createImg('cut_btn.png');
  button.position(1070,430);
  button.size(50,50);
  button.mouseClicked(handleButtonPress);
}

function draw() {
  background(51);

  image(bg,5,5,1500,700);
  
  bridge.show();
  g1.show();
  g2.show();
  //ellipse(stone.position.x,stone.position.y,15);
  //stone.show();
  for(var stone of stones){
    stone.show();
  }
  Engine.update(engine);

  drawSprites();

  if(stone!=null){
    image(stoneImg,stone.position.x,stone.position.y,70,70);
  }
}

function handleButtonPress(){
  link.detatch();
  setTimeout(()=> {
    bridge.break();
  },1500);
}