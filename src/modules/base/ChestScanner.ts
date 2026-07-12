import { Bot } from "mineflayer";


export class ChestScanner {


constructor(
private bot:Bot
){}



findChests(){


return this.bot.findBlocks({

matching:block =>
block.name.includes("chest"),


maxDistance:32,


count:20


});


}



}