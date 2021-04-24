class Node{
    constructor(MainCharacter,parent=null){
        this.mainCharacter = MainCharacter;
        this.parent = null;
        this.children = [];
        this.openSet = [];
        this.closeSet = [this.mainCharacter.Id()];
        
    }
    Voraz(){
        this.getChoices();
        return this.SelectBestChoice();
    }

    getChoices(){
        //Shortcut Variables in reference 
        var Xactive = this.mainCharacter.Xactive;
        var Yactive = this.mainCharacter.Yactive;
        var world = this.mainCharacter.world;
        //Direccional values 
        var LeftSlice = (Xactive!=0)?-1:0 //Take left square, if I'm not on the left edge
        var RightSlice = (Xactive!=world.getWidth()-1)?1:0 //Take right square, if I'm not on the right edge
        var DownSlice = (Yactive!=0)?-1:0 //Take down square, if I'm not on the down edge
        var TopSlice = (Yactive!=world.getHeight()-1)?1:0 //Take down square, if I'm not on the down edge
        //Position Values
        var XLeft = Xactive+LeftSlice;
        var XRight = Xactive+RightSlice;
        var YDown = Yactive+DownSlice;
        var YTop = Yactive+TopSlice;
        
        //Add posible choices
        for(var y=YDown;y<=YTop;y++)
        {
            for(var x=XLeft;x<=XRight;x++)
            {
                let isEmptySpace = world.Data[y][x]==0;
                let currentId = world.PosToId(x,y);
                let ExistInSet =  this.openSet.concat(this.closeSet).includes(currentId)
                //console.log(currentId,isEmptySpace,ExistInSet)
                if(isEmptySpace && !ExistInSet){
                    this.openSet.push(currentId);
                }
            }
        }
            
    }


    SelectBestChoice(){
        //var BestChoiceId = Math.min( ...this.openSet);
        var CostArray = this.mainCharacter.world.Cost;
        var BestCost = this.openSet.reduce((acc,id)=>{
            //var id = id;
            let y = Math.trunc(id/10); 
            let x = id%10;           
            let Cost= CostArray[y][x]
            acc = (Cost<acc[0])?[Cost,x,y]:acc;
            return acc;
        },[5000,-1,-1]);//,acc, x , y 
        var BestId = this.mainCharacter.world.PosToId(BestCost[1],BestCost[2])
        this.closeSet.push(BestId);
        this.openSet.splice(this.openSet.indexOf(BestId), 1);

        return [BestCost[1],BestCost[2]];
    }

    OpenSetinPosition(){
        return this.openSet.map(id=>[id%10, Math.trunc(id/10) ])
    }
    CloseSetinPosition(){
        return this.closeSet.map(id=>[id%10, Math.trunc(id/10)]);
    }//.pop()
}