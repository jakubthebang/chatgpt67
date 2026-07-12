import { Bot } from "mineflayer";
import { BlockData } from "./BlueprintLoader";


export class MaterialChecker {


constructor(
private bot:Bot
){}



check(
blocks:BlockData[]
){


for(
const block of blocks
){


const item =
this.bot.inventory.items()
.find(
i=>i.name.includes(
block.block
)
);



if(!item)
return false;


}



return true;


}


}
