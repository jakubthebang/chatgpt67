import { Bot } from "mineflayer";


export class InventorySorter {


constructor(
private bot:Bot
){}



sort(){


const items =
this.bot.inventory.items();



return items.sort(
(a,b)=>
a.name.localeCompare(
b.name
)
);



}



}