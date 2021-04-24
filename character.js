class Character{
    constructor(Xactive,Yactive){
        this.Xactive =Xactive;
        this.Yactive =Yactive;
    }
    SetPosition(Xactive,Yactive){
        this.Xactive =Xactive;
        this.Yactive =Yactive;
    }
    Exist(){
        return this.Xactive!=null && this.Yactive!=null;
    }
}

class MainCharacter extends Character{
    constructor(Xactive,Yactive,world=null){
        super(Xactive,Yactive,world);
        this.world = world;
        
    }
    getNeighbours(){
        var LeftSlice = (this.Xactive!=0)?-1:0 //Take left square, if I'm not on the left edge
        var RightSlice = (this.Xactive!=this.world.getWidth()-1)?1:0 //Take right square, if I'm not on the right edge
        var DownSlice = (this.Yactive!=0)?-1:0 //Take down square, if I'm not on the down edge
        var TopSlice = (this.Yactive!=this.world.getHeight()-1)?1:0 //Take down square, if I'm not on the down edge

        var XLeft = this.Xactive+LeftSlice;
        var XRight = this.Xactive+RightSlice+1;//+1 to inclusive interval
        var YDown = this.Yactive+DownSlice;
        var YTop = this.Yactive+TopSlice+1;//+1 to inclusive interval
        
        var WorldRange = this.world.Data.slice(YDown, YTop).map(array=>array.slice(XLeft,XRight));
        var CostRange = this.world.Cost.slice(YDown, YTop).map(array=>array.slice(XLeft,XRight));
        //var IndexRange = 
        return [WorldRange,CostRange];
    }
    PosToId(x,y){
        return world.PosToId(x,y);
    }
}

class World{
    // 0 Empty Space
    // 1 Obstacle Space
    constructor(XAmount,YAmount){
        this.Data = Array(YAmount).fill(null).map(() => Array(XAmount).fill(false));
        this.Obstacles =[];
        this.Cost = Array(YAmount).fill(null).map(() => Array(XAmount).fill(null));
    }
    getWidth(){
        return this.Data[0].length;
    }
    getHeight(){
        return this.Data.length;
    }
    SetCost(XGoal,YGoal){
        this.Cost.forEach((rowArray,Ypos)=>{
            rowArray.forEach((values,Xpos)=>{
                this.Cost[Ypos][Xpos]= Math.abs(Xpos-XGoal)+Math.abs(Ypos-YGoal);
            });
        });
    }
 
    SetObtacles(Xnew,Ynew){
        let newDataValue = !Boolean(this.Data[Ynew][Xnew]);
        let OneDimValue = this.PosToId(Xnew,Ynew);
        this.Data[Ynew][Xnew]=newDataValue;//Change 0->1 and 1->0
        if(newDataValue)
            this.Obstacles.push(OneDimValue);
        else
            this.Obstacles.splice(this.Obstacles.indexOf(OneDimValue),1);
        return newDataValue;
    }
    PosToId(x,y){
        return y*this.getWidth()+x;
    }

}