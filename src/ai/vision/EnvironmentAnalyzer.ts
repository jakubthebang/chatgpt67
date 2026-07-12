import { Bot } from "mineflayer";


export class EnvironmentAnalyzer {



analyze(
bot:Bot
){


return {


health:
bot.health,


food:
bot.food,


time:
bot.time.timeOfDay,


underground:
bot.entity.position.y < 40


};



}



}