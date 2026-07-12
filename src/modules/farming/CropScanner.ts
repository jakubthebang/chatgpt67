import { Bot } from "mineflayer";


export class CropScanner {


constructor(
private bot:Bot
){}



findCrops(){


const crops=[

"wheat",

"carrots",

"potatoes",

"beetroots"

];



return this.bot.findBlocks({

matching:block =>
crops.includes(
block.name
),


maxDistance:32,


count:100


});


}



}