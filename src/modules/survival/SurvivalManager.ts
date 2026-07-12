import { Bot } from "mineflayer";
import { HealthMonitor } from "./HealthMonitor";
import { AutoEat } from "./AutoEat";


export class SurvivalManager {


private health: HealthMonitor;
private food: AutoEat;


constructor(
    private bot: Bot
){

    this.health =
        new HealthMonitor(bot);


    this.food =
        new AutoEat(bot);

}



start(){

    this.health.start();

    this.food.start();

}


}
