import { Bot } from "mineflayer";


export class BlockScanner {


constructor(
private bot:Bot
){}



scan(){


const blocks =
this.bot.findBlocks({

matching:block=>true,


maxDistance:8,


count:100


});



return blocks;


}



find(
name:string
){


return this.bot.findBlocks({

matching:block =>
block.name.includes(name),


maxDistance:32,


count:10


});


}



}