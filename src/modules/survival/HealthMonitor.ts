import { Bot } from "mineflayer";


export class HealthMonitor {


constructor(
    private bot: Bot
){}



start(){

this.bot.on(
    "health",
    ()=>{


        if(this.bot.health <= 6){

            this.bot.chat(
                "⚠ Low health!"
            );

        }


    }
);


}


}
