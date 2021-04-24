var SquareSize = 50;
var XAmount =10;
var YAmount =8;
var Mode= "Normal";
var world = new World(XAmount,YAmount);
var character = new MainCharacter(null,null,world);
var goal = new Character(null,null)

function setup(){
    let TotalWidth = SquareSize*XAmount;
    let TotalHeight = SquareSize*YAmount;
      
    createCanvas(TotalWidth, TotalHeight); 
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
        console.log(XindexSelected,YindexSelected)
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

function UpdateOpenSet(OpenSetPosition){
    OpenSetPosition.forEach(Position => {
        RenderOpenSet(Position[0]*SquareSize,Position[1]*SquareSize);
    });
}
function UpdateCloseSet(CloseSetPosition){
    CloseSetPosition.forEach(Position => {
        RenderCloseSet(Position[0]*SquareSize,Position[1]*SquareSize);
    });
}




function keyPressed(){
    SwitchMode(key)
    console.log(Mode);

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