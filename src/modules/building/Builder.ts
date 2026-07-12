import { Bot } from "mineflayer";
import { BlockData } from "./BlueprintLoader";


export class Builder {


constructor(
private bot:Bot
){}



async build(
blocks:BlockData[]
){


const origin =
this.bot.entity.position;


for(
const block of blocks
){


const target =
this.bot.blockAt(
origin.offset(
block.x,
block.y,
block.z
)
);



if(!target)
continue;



const item =
this.bot.inventory.items()
.find(
i=>i.name.includes(
block.block
)
);



if(!item)
continue;



await this.bot.equip(
item,
"hand"
);



try{


await this.bot.placeBlock(
target,
{
x:0,
y:1,
z:0
}
);


}catch{}

}



}


}
