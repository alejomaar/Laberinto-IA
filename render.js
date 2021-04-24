function grid(){
    let Xcoordinate=0;
    let Ycoordinate=0;
    
    for(var yiter=0;yiter<YAmount;yiter++){
        for(var xiter=0;xiter<XAmount;xiter++){
            square(Xcoordinate, Ycoordinate, SquareSize);
            Xcoordinate= Xcoordinate+SquareSize;
        }
        Xcoordinate=0;
        Ycoordinate=Ycoordinate+SquareSize;
    }
    
}


function RenderObstacle(Xpos,Ypos){
    fill("black")
    square(Xpos, Ypos, SquareSize);
}

function RenderClean(Xpos,Ypos){
    fill("white")
    square(Xpos, Ypos, SquareSize);
}
function RenderCharacter(Xpos,Ypos){
    fill("blue")
    square(Xpos, Ypos, SquareSize);
}
function RenderGoal(Xpos,Ypos){
    fill("red")
    square(Xpos, Ypos, SquareSize);
}