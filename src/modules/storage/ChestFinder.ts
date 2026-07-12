import { Bot } from "mineflayer";


export class ChestFinder {


constructor(
    private bot:Bot
){}



async findChest(){


const block =
this.bot.findBlock({

matching:block =>
block.name === "chest",


maxDistance:32


});



return block ?? null;


}



}
