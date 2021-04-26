function grid(){
    let Xcoordinate=0;
    let Ycoordinate=0;
    textSize(20)
    for(var yiter=0;yiter<YAmount;yiter++){
        for(var xiter=0;xiter<XAmount;xiter++){
            fill(200,200,200);
            image(img.ground,Xcoordinate, Ycoordinate,80,80)
            let id = world.PosToId(xiter,yiter);
            fill(0,0,0);
            text(id, Xcoordinate, Ycoordinate, SquareSize, SquareSize);
            Xcoordinate= Xcoordinate+SquareSize;
        }
        Xcoordinate=0;
        Ycoordinate=Ycoordinate+SquareSize;
    }
    
}


function RenderObstacle(Xpos,Ypos){
    RenderItem(img.grass,Xpos,Ypos);
}

function RenderClean(Xpos,Ypos){
    RenderItem(img.ground,Xpos,Ypos);
}
function RenderCharacter(Xpos,Ypos){
    RenderItem(img.character[0],Xpos,Ypos);
}
function RenderGoal(Xpos,Ypos){
    RenderItem(img.goal,Xpos,Ypos);
}

function RenderItem(img,Xpos,Ypos){
    image(img,Xpos,Ypos,80,80);
    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}


function RenderOpenSet(Xpos,Ypos,costArr){
    RenderSet(Xpos,Ypos,[200,200,0],costArr);
}

function RenderCloseSet(Xpos,Ypos,costArr){
    RenderSet(Xpos,Ypos,[200,0,0],costArr);
}

function RenderWin(Xpos,Ypos,imgCharacter){

    image(img.ground,Xpos, Ypos,80,80);
    fill(0,125,0,180);
    square(Xpos, Ypos, SquareSize);
    
    image(imgCharacter,Xpos, Ypos,80,80);      
}

function RenderEnd(Xpos,Ypos){
    image(img.ground,Xpos, Ypos,80,80);
    image(img.end,Xpos, Ypos,80,80); 
}


function RenderSet(Xpos,Ypos,color,costObj){
    image(img.ground,Xpos, Ypos,80,80)
    fill(color[0],color[1],color[2],125);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    textAlign(LEFT,TOP);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
    //Cost
    textAlign(RIGHT,BOTTOM);
    text(costObj.GoalCost, Xpos, Ypos, SquareSize, SquareSize);
    if(costObj.TotalCost!=null){
        //Total Cost
        textAlign(RIGHT,TOP);
        text(costObj.TotalCost, Xpos, Ypos, SquareSize, SquareSize);
        //StepCost
        textAlign(LEFT,BOTTOM);
        text(costObj.StepCost, Xpos, Ypos, SquareSize, SquareSize);
    }
    //CostStep
    
}


/*function RenderSquareEstrella(Xpos,Ypos,color,cost){
    fill(color[0],color[1],color[2]);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    textAlign(LEFT,TOP)
    text(id, Xpos, Ypos, SquareSize, SquareSize);

    textAlign(RIGHT,BOTTOM)
    text(cost, Xpos, Ypos, SquareSize, SquareSize);
}*/