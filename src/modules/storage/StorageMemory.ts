import { Vec3 } from "vec3";


export class StorageMemory {


private chests:Vec3[] = [];



remember(
position:Vec3
){

this.chests.push(
    position
);

}



getChests(){

return this.chests;

}



clear(){

this.chests=[];

}


}
