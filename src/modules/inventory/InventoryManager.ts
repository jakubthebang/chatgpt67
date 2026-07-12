import { Bot } from "mineflayer";
import { ItemCounter } from "./ItemCounter";
import { InventoryCleaner } from "./InventoryCleaner";


export class InventoryManager {


private counter: ItemCounter;
private cleaner: InventoryCleaner;


constructor(
    private bot: Bot
){

    this.counter =
        new ItemCounter(bot);


    this.cleaner =
        new InventoryCleaner(bot);

}



getItems(){

    return this.bot.inventory.items();

}



count(item:string){

    return this.counter.count(item);

}



isFull(){

    return this.bot.inventory.emptySlotCount() === 0;

}



clearTrash(){

    this.cleaner.clean();

}


}
