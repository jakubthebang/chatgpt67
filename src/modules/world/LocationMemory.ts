import { Vec3 } from "vec3";


export interface Location {


name:string;


position:Vec3;


}



export class LocationMemory {


private locations:Location[]=[];



add(
name:string,
position:Vec3
){

this.locations.push({

name,

position:position.clone()

});


}



get(
name:string
){

return this.locations.find(
l=>l.name===name
);

}



list(){

return this.locations;

}



}