import { Bot } from "mineflayer";
import { Vec3 } from "vec3";


export class OreFinder {


constructor(
    private bot:Bot
){}



async findOre(
    ore:string
){


const blocks =
this.bot.findBlocks({

matching:block=>{

return block.name
.toLowerCase()
.includes(ore);

},


maxDistance:32,

count:1

});



if(blocks.length===0)
return null;



return this.bot.blockAt(
    new Vec3(
        blocks[0].x,
        blocks[0].y,
        blocks[0].z
    )
);


}


}
