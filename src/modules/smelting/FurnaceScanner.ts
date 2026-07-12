import { Bot } from "mineflayer";


export class FurnaceScanner {


constructor(
private bot:Bot
){}



find(){

return this.bot.findBlocks({

matching:block =>
block.name.includes("furnace"),


maxDistance:32,


count:10


});


}



}