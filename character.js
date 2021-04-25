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
    
    Id(){
        return world.PosToId(this.Xactive,this.Yactive);
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