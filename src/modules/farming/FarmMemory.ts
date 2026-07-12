export class FarmMemory {


private harvested:string[] = [];



addHarvest(
crop:string
){

this.harvested.push(
crop
);

}



getHistory(){

return this.harvested;

}



clear(){

this.harvested=[];

}


}
