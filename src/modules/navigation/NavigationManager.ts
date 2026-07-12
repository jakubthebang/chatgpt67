import { Bot } from "mineflayer";
import { WaypointManager } from "./WaypointManager";
import { HomeManager } from "./HomeManager";


export class NavigationManager {


private waypoints: WaypointManager;
private home: HomeManager;



constructor(
    private bot:Bot
){

    this.waypoints =
        new WaypointManager();


    this.home =
        new HomeManager();

}



gotoWaypoint(
name:string
){


const point =
this.waypoints.get(
    name
);



if(!point){

    this.bot.chat(
        "Waypoint not found"
    );

    return;

}



this.bot.chat(
`Going to ${name}`
);



}



setHome(){

this.home.set(
    this.bot.entity.position
);


this.bot.chat(
    "Home position saved"
);


}



goHome(){

const home =
this.home.get();



if(!home){

this.bot.chat(
"No home set"
);

return;

}



this.bot.chat(
"Returning home"
);



}



}
