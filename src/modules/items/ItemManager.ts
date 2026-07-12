import { Bot } from "mineflayer";
import { ItemFilter } from "./ItemFilter";
import { InventorySorter } from "./InventorySorter";
import { ItemCollector } from "./ItemCollector";
import { ItemDatabase } from "./ItemDatabase";


export class ItemManager {


private filter:ItemFilter;

private sorter:InventorySorter;

private collector:ItemCollector;

private database:ItemDatabase;



constructor(
private bot:Bot
){


this.filter =
new ItemFilter();


this.sorter =
new InventorySorter(bot);


this.collector =
new ItemCollector(bot);


this.database =
new ItemDatabase();


}



has(
item:string
){


return this.bot.inventory.items()
.some(
i=>i.name.includes(item)
);


}



count(
item:string
){


return this.bot.inventory.items()
.filter(
i=>i.name.includes(item)
)
.reduce(
(a,b)=>a+b.count,
0
);



}



}