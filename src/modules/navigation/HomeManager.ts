import { Vec3 } from "vec3";


export class HomeManager {


private home?:Vec3;



set(
position:Vec3
){

this.home =
position.clone();

}



get(){

return this.home;

}



exists(){

return this.home !== undefined;

}



}
