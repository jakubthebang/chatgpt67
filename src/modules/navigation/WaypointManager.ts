import { Vec3 } from "vec3";


export interface Waypoint {

name:string;

position:Vec3;

}



export class WaypointManager {


private points:
Waypoint[] = [];



add(
name:string,
position:Vec3
){


this.points.push({

name,

position

});


}



get(
name:string
){


return this.points.find(
point =>
point.name === name
);


}



list(){

return this.points;

}



remove(
name:string
){

this.points =
this.points.filter(
p=>p.name!==name
);

}



}
