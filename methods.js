class Search{
    constructor(MainCharacter){
        this.mainCharacter = MainCharacter;
        this.openSet = [];
        this.closeSet = [new Node(this.mainCharacter.Id())];
        this.currentNode = this.closeSet[0];
        
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
                let ExistInSet =  this.openSet.concat(this.closeSet).some(node=>node.id==currentId);
                if(isEmptySpace && !ExistInSet){
                    let NewNodeOpenSet = new Node(currentId,  this.currentNode);
                    this.openSet.push(NewNodeOpenSet);
                    //var NewChildrenNode = new Tree(currentId,this.RootNode); 
                }
            }
        }
            
    }
 

    SelectBestChoice(){
        //var BestChoiceId = Math.min( ...this.openSet);
        var CostArray = this.mainCharacter.world.Cost;
        var BestCost = this.openSet.reduce((acc,node)=>{
            let id = node.id;
            let y = Math.trunc(id/10); 
            let x = id%10;           
            let Cost= CostArray[y][x]
            acc = (Cost<acc[0])?[Cost,node]:acc;
            return acc;
        },[5000,null]);//,acc, currentNode
        //Select characteristics of best node 
        var isWin = BestCost[0]==0;
        //console.log("ISwIN",isWin)
        var BestNode = BestCost[1];
        var BestId = BestNode.id;
        var BestX = BestId%10;
        var BestY = Math.trunc(BestId/10);
        //Update the sets 
        this.currentNode = BestNode;
        this.closeSet.push(this.currentNode);
        this.openSet= this.openSet.filter(node =>node.id!=BestId)
        
        return [BestX,BestY,isWin];
    }

    idToX(id){
        return id%10;
    }
    idToY(id){
        return Math.trunc(id/10);
    }
    costId(id){
        let x = this.idToX(id);
        let y = this.idToY(id);
        return this.mainCharacter.world.Cost[y][x];
    }


    OpenSetinPosition(){
        return this.openSet.map(node=>(
            {
               x:this.idToX(node.id),
               y:this.idToY(node.id),
               cost:{
                    TotalCost:null,
                    StepCost:null,
                    GoalCost: 10*this.costId(node.id)
                } 
            }
        ));
    }
    CloseSetinPosition(){
        return this.closeSet.map(node=>(
            {
               x:this.idToX(node.id),
               y:this.idToY(node.id),
               cost:{
                    TotalCost:null,
                    StepCost:null,
                    GoalCost: 10*this.costId(node.id)
                } 
            }
        ));
    }
    WinRoute(){
        var idsWin = [];
        var WinNode = this.currentNode;
        while(WinNode.parent!=null){
            idsWin.unshift(WinNode.id);
            WinNode= WinNode.parent;
        }
        idsWin.unshift(WinNode.id);
        return idsWin.map(id=>[id%10,Math.trunc(id/10)]);
    }
}


class Node{
    constructor(id,parent=null){
        this.id=id;
        this.parent=parent;
    }
}



class Search2{
    constructor(MainCharacter){
        this.mainCharacter = MainCharacter;
        this.openSet = [];
        this.closeSet = [new Node2(this.mainCharacter.Id())];
        this.currentNode = this.closeSet[0];
        
    }
    
    Estrella(){
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

                let ExistInOpenSet =  this.openSet.some(node=>node.id==currentId);
                let ExistInCloseSet =  this.closeSet.some(node=>node.id==currentId);
                let NotExistInSet = !ExistInOpenSet && !ExistInCloseSet;
                if(isEmptySpace && NotExistInSet){
                    let CostInSteps = ((Math.abs(Xactive-x)+Math.abs(Yactive-y))==1)?10:14;
                    let NewNodeOpenSet = new Node2(currentId,  this.currentNode,CostInSteps);
                    this.openSet.push(NewNodeOpenSet);
                }else if(ExistInOpenSet){
                    let OldNode = this.openSet.find(node =>node.id==currentId);
                    let CostInSteps = ((Math.abs(Xactive-x)+Math.abs(Yactive-y))==1)?10:14;  
                    if(this.currentNode.costSteps+CostInSteps<OldNode.costSteps){
                        OldNode.parent = this.currentNode;
                        OldNode.costSteps= this.currentNode.costSteps+CostInSteps;
                    }
                }
                
                //if(ExistInOpenSet){
                   // let CostCurrent = this.costId(currentId);

                   // if(this.currentNode.)
                //}
            }
        }
            
    }

    SelectBestChoice(){
        //var BestChoiceId = Math.min( ...this.openSet);
        var CostArray = this.mainCharacter.world.Cost;
        var BestCost = this.openSet.reduce((acc,node)=>{
            let id = node.id;            
            let y = Math.trunc(id/10); 
            let x = id%10;           
            let Cost= node.costSteps+ 10*CostArray[y][x];
            acc = (Cost<acc[0])?[Cost,node]:acc;
            return acc;
        },[5000,null]);//,acc, currentNode
        //Select characteristics of best node 
        
        var BestNode = BestCost[1];
        var BestId = BestNode.id;
        var BestX = BestId%10;
        var BestY = Math.trunc(BestId/10);
        var isWin = CostArray[BestY][BestX]==0;
        //Update the sets 
        this.currentNode = BestNode;
        this.closeSet.push(this.currentNode);
        this.openSet= this.openSet.filter(node =>node.id!=BestId)//Erase node in openSet
        
        return [BestX,BestY,isWin];
    }

    WinRoute(){
        var idsWin = [];
        var WinNode = this.currentNode;
        while(WinNode.parent!=null){
            idsWin.unshift(WinNode.id);
            WinNode= WinNode.parent;
        }
        idsWin.unshift(WinNode.id);
        return idsWin.map(id=>[id%10,Math.trunc(id/10)]);
    }
    idToX(id){
        return id%10;
    }
    idToY(id){
        return Math.trunc(id/10);
    }
    costId(id){
        let x = this.idToX(id);
        let y = this.idToY(id);
        return this.mainCharacter.world.Cost[y][x];
    }
    OpenSetinPosition(){
        return this.openSet.map(node=>(
            {
               x:this.idToX(node.id),
               y:this.idToY(node.id),
               cost:{
                    TotalCost:node.costSteps+10*this.costId(node.id),
                    StepCost:node.costSteps,
                    GoalCost: 10*this.costId(node.id)
                    } 
            }
        ));
           
    }
    CloseSetinPosition(){
        return this.closeSet.map(node=>(
            {
                x:this.idToX(node.id),
                y:this.idToY(node.id),
                cost:{
                     TotalCost:node.costSteps+10*this.costId(node.id),
                     StepCost:node.costSteps,
                     GoalCost: 10*this.costId(node.id)
                     } 
            }
        ));
    }
}


class Node2{
    constructor(id,parent=null,cost=null){
        this.id=id;
        this.parent=parent;
        this.costSteps =(parent==null)?0:this.parent.costSteps+ cost;
    }
}