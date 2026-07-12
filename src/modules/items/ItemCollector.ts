import { Bot } from "mineflayer";


export class ItemCollector {


constructor(
private bot:Bot
){}



findDroppedItems(){


return Object.values(
this.bot.entities
)
.filter(
entity=>
entity.name==="item"
);



}



async collect(){


const items =
this.findDroppedItems();



for(
const item of items
){


await this.bot.lookAt(
item.position
);


}



}



}