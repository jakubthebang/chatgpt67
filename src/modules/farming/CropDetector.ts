import { Bot } from "mineflayer";


export class CropDetector {


constructor(
    private bot:Bot
){}



findReadyCrops(){


const crops =
this.bot.findBlocks({

matching:block=>{


const name =
block.name;


return (

name.includes("wheat") ||
name.includes("carrots") ||
name.includes("potatoes") ||
name.includes("beetroots")

);


},


maxDistance:32,

count:20


});



return crops
.map(pos =>
this.bot.blockAt(pos)
)
.filter(Boolean);



}


}
