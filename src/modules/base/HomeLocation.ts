import { Vec3 } from "vec3";


export class HomeLocation {


private location?:Vec3;



set(
position:Vec3
){

this.location =
position.clone();

}



get(){

return this.location;

}



exists(){

return this.location !== undefined;

}



clear(){

this.location =
undefined;

}



}