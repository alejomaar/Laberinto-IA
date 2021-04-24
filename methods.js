class Node{
    constructor(MainCharacter,parent=null){
        this.mainCharacter = MainCharacter;
        this.parent = null;
        this.children = [];
        this.openSet = [this.mainCharacter.Id()];
        this.closeSet = [];
        
    }
    Voraz(){
        var BestChoice = this.mainCharacter.getChoice();
        return BestChoice; 
    }
    AddToOpenSet(){
        
    }
    /*GetBestChoice(Neighbours){
        var WorldRange = Neighbours[0];
        var CostRange = Neighbours[1];
        
        var MinCost = 1000;
        //If the actual value is minor than MinCost, update MinCost with Value
        CostRange.forEach((rowArray,Ypos)=>{
            rowArray.forEach((value,Xpos)=>{
                if(WorldRange[Ypos][Xpos]==0&& value<MinCost){
                    MinCost=value;
                }              
            });
        });
        return {Cost:MinCost, X:Xpos,Y:Ypos};
    }*/
}