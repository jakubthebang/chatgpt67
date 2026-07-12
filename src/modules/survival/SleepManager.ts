import { Bot } from "mineflayer";


export class SleepManager {


constructor(
private bot:Bot
){}



isNight(){

return (
this.bot.time.timeOfDay > 13000
);

}



async sleep(){


const bed =
this.bot.findBlock({

matching:block =>
block.name.includes("bed"),


maxDistance:32


});



if(!bed)
return false;



await this.bot.sleep(
bed
);



return true;


}



}