import { Bot } from "mineflayer";


export class InventoryCleaner {


private trash = [

"dirt",
"gravel",
"cobblestone"

];



constructor(
private bot:Bot
){}



async clean(){


for(
const item of this.bot.inventory.items()
){


if(
this.trash.some(
trash =>
item.name.includes(trash)
)
){


await this.bot.tossStack(
item
);


}



}



}


}
