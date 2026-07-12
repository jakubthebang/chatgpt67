import { Bot } from "mineflayer";


export class ToolManager {


constructor(
    private bot:Bot
){}



async selectTool(
block:any
){


const tools =
this.bot.inventory.items();



const pickaxe =
tools.find(item=>

item.name.includes(
    "pickaxe"
)

);



if(pickaxe){

await this.bot.equip(
    pickaxe,
    "hand"
);

}


}



}
