import { Bot } from "mineflayer";


export class HungerManager {


constructor(
private bot:Bot
){}



getFood(){

return this.bot.food;

}



needsFood(){

return this.bot.food < 14;

}



canEat(){

return this.bot.food < 20;

}



}