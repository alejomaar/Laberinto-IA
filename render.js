function grid(){
    let Xcoordinate=0;
    let Ycoordinate=0;
    
    for(var yiter=0;yiter<YAmount;yiter++){
        for(var xiter=0;xiter<XAmount;xiter++){
            fill(200,200,200);
            square(Xcoordinate, Ycoordinate, SquareSize);
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
    fill(50,50,50);
    square(Xpos, Ypos, SquareSize);
}

function RenderClean(Xpos,Ypos){
  
    RenderSquare(Xpos,Ypos,[200,200,200]);
}
function RenderCharacter(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[0,0,0]);
}
function RenderGoal(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[255,255,255]);
}

function RenderOpenSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[200,200,0]);
}

function RenderCloseSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[200,0,0]);
}

function RenderSquare(Xpos,Ypos,color){
    fill(color[0],color[1],color[2]);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}