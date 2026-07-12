import { Bot } from "mineflayer";


export class FuelManager {


constructor(
private bot:Bot
){}



hasFuel(){


return this.bot.inventory.items()
.some(
item =>
item.name.includes("coal") ||
item.name.includes("wood")
);


}



}