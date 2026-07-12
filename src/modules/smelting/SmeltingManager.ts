import { Bot } from "mineflayer";
import { FurnaceScanner } from "./FurnaceScanner";
import { FuelManager } from "./FuelManager";
import { SmeltPlanner } from "./SmeltPlanner";


export class SmeltingManager {


private furnace:FurnaceScanner;

private fuel:FuelManager;

private planner:SmeltPlanner;



constructor(
private bot:Bot
){


this.furnace =
new FurnaceScanner(bot);


this.fuel =
new FuelManager(bot);


this.planner =
new SmeltPlanner();


}



createPlan(
item:string
){


return this.planner.plan(
item
);



}



status(){


return {


furnaces:
this.furnace.find().length,


fuel:
this.fuel.hasFuel()



};



}



}