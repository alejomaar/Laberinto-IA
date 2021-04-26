var SquareSize = 80;
var XAmount =10;
var YAmount =8;
var Mode= "Normal";
var world = new World(XAmount,YAmount);
var character = new MainCharacter(null,null,world);
var goal = new Character(null,null)
var img ={character:[], grass:null,ground:null,goal:null}

function preload(){
    for(var i=1;i<=8;i++){
        img.character.push(loadImage('sprites/Character'+i+'.png')) ;
    }
    img.grass = loadImage('sprites/grass.png')
    img.ground = loadImage('sprites/ground.png')
    img.goal = loadImage('sprites/meta.png')
}

function setup(){
    let TotalWidth = SquareSize*XAmount;
    let TotalHeight = SquareSize*YAmount;     
    var Canvas = createCanvas(TotalWidth, TotalHeight); 
    Canvas.parent("canvas");
    background(255,255,0);   
    grid();
    //rect(50, 50, 300, 200);
}




function mousePressed() {
    let XindexSelected = Math.trunc(mouseX/SquareSize);
    let YindexSelected = Math.trunc(mouseY/SquareSize);
    let CanvasLimitX = mouseX>0 && mouseX<width;
    let CanvasLimitY = mouseY>0 && mouseY<height;
    let CanvasLimit = CanvasLimitX&&CanvasLimitY;
    if(CanvasLimit){
        if(Mode=="Obstacle")
            ObstacleMode(XindexSelected,YindexSelected)
        if(Mode=="Character")
            CharacterMode(XindexSelected,YindexSelected)
        if(Mode=="Goal")
            GoalMode(XindexSelected,YindexSelected)
    }
           
}

function ObstacleMode(XindexSelected,YindexSelected){
    var ObstacleType =world.SetObtacles(XindexSelected,YindexSelected)
    if(ObstacleType)
        RenderObstacle(XindexSelected*SquareSize,YindexSelected*SquareSize)        
    else 
        RenderClean(XindexSelected*SquareSize,YindexSelected*SquareSize)
}


function CharacterMode(XindexSelected,YindexSelected){
    if(character.Exist())
        RenderClean(character.Xactive*SquareSize,character.Yactive*SquareSize)
    character.SetPosition(XindexSelected,YindexSelected)
    RenderCharacter(character.Xactive*SquareSize,character.Yactive*SquareSize)
}

function GoalMode(XindexSelected,YindexSelected){
    if(goal.Exist())
        RenderClean(goal.Xactive*SquareSize,goal.Yactive*SquareSize)
    //Recalculate Position of goal 
    goal.SetPosition(XindexSelected,YindexSelected)
    //Uptade the cost of all squares in world
    world.SetCost(XindexSelected,YindexSelected);
    //Render
    RenderGoal(goal.Xactive*SquareSize,goal.Yactive*SquareSize)
}

function UpdateOpenSet(OpenSet){
    OpenSet.forEach(node => {
        RenderOpenSet(node.x*SquareSize,node.y*SquareSize,node.cost);        
    });
}
function UpdateCloseSet(CloseSet){
    CloseSet.forEach(node => {
        RenderCloseSet(node.x*SquareSize,node.y*SquareSize,node.cost);        
    });
}


function AnimationWin(WinRoute){
    var iter=0;
    var ImageCharacter=null;
    var idAnimation = setInterval(()=>{
        Position = WinRoute[iter];
        PositionNext = WinRoute[iter+1];
        let XDir = PositionNext[0]-Position[0];
        let YDir = PositionNext[1]-Position[1];
        let idDirection = ""+XDir+""+YDir;

        switch(idDirection){
            case "-1-1":
                ImageCharacter= img.character[5]; 
                break;
            case "0-1":
                ImageCharacter= img.character[6]; 
                break;
            case "1-1":
                ImageCharacter= img.character[7]; 
                break;
            case "-10":
                ImageCharacter= img.character[4]; 
                break;
            case "10":
                ImageCharacter= img.character[0]; 
                break;
            case "-11":
                ImageCharacter= img.character[3]; 
                break;
            case "01":
                ImageCharacter= img.character[2]; 
                break;
            case "11":
                ImageCharacter= img.character[1]; 
                break;

        }

        RenderWin(Position[0]*SquareSize,Position[1]*SquareSize,ImageCharacter);
        iter++;
        if(iter>=WinRoute.length-1)
            clearInterval(idAnimation);
    },500);

    /*WinRoute.forEach(Position => {
        RenderWin(Position[0]*SquareSize,Position[1]*SquareSize);
    });*/
}




function keyPressed(){
    SwitchMode(key)

    function SwitchMode(key){
        switch(key){
            case "a":
                Mode="Normal";
                break;
            case "d":
                Mode="Obstacle";
                break;
            case "w":
                Mode="Character";
                break;
            case "s":
                Mode="Goal";
                break;
        }
    }
}