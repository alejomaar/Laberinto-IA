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
    //fill(50,50,50);
    image(img.grass,Xpos,Ypos,80,80)
    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}

function RenderClean(Xpos,Ypos){
  
    image(img.ground,Xpos, Ypos,80,80)
    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}
function RenderCharacter(Xpos,Ypos){
    //RenderSquare(Xpos,Ypos,[0,0,0]);
    image(img.character[0],Xpos,Ypos,80,80);
    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}
function RenderGoal(Xpos,Ypos){
    image(img.goal,Xpos,Ypos,80,80);
    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    text(id, Xpos, Ypos, SquareSize, SquareSize);
    //RenderSquare(Xpos,Ypos,[255,255,255]);
}

function RenderOpenSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[200,200,0,20]);
}

function RenderCloseSet(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[200,0,0]);
}



function RenderWin(Xpos,Ypos){
    RenderSquare(Xpos,Ypos,[0,125,0]);
}


function RenderSquare(Xpos,Ypos,color){
    image(img.ground,Xpos, Ypos,80,80)
    fill(color[0],color[1],color[2],125);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    text(id, Xpos, Ypos, SquareSize, SquareSize);
}


function RenderOpenSetEstrella(Xpos,Ypos,cost){
    RenderSquareEstrella(Xpos,Ypos,[200,200,0],cost);
}

function RenderCloseSetEstrella(Xpos,Ypos,cost){
    RenderSquareEstrella(Xpos,Ypos,[200,0,0],cost);
}


function RenderSquareEstrella(Xpos,Ypos,color,cost){
    fill(color[0],color[1],color[2]);
    square(Xpos, Ypos, SquareSize);

    let id = world.PosToId(Xpos/SquareSize,Ypos/SquareSize);
    fill("black");
    textAlign(LEFT,TOP)
    text(id, Xpos, Ypos, SquareSize, SquareSize);

    textAlign(RIGHT,BOTTOM)
    text(cost, Xpos, Ypos, SquareSize, SquareSize);
}