function grid(){
    let Xcoordinate=0;
    let Ycoordinate=0;
    
    for(var yiter=0;yiter<YAmount;yiter++){
        for(var xiter=0;xiter<XAmount;xiter++){
            square(Xcoordinate, Ycoordinate, SquareSize);
            let id = world.PosToId(xiter,yiter);
            text(id, Xcoordinate, Ycoordinate, SquareSize, SquareSize);
            Xcoordinate= Xcoordinate+SquareSize;
        }
        Xcoordinate=0;
        Ycoordinate=Ycoordinate+SquareSize;
    }
    
}


function RenderObstacle(Xpos,Ypos){
    fill("black");
    square(Xpos, Ypos, SquareSize);
}

function RenderClean(Xpos,Ypos){
  
    RenderSquare(Xpos,Ypos,"white");
}
function RenderCharacter(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,"blue");
}
function RenderGoal(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,"red");
}

function RenderOpenSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,"pink");
}

function RenderCloseSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,"green");
}

function RenderSquare(Xpos,Ypos,color){
    fill(color);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}