import { Bot } from "mineflayer";
import { ChestFinder } from "./ChestFinder";
import { StorageMemory } from "./StorageMemory";


export class StorageManager {


private finder: ChestFinder;
private memory: StorageMemory;



constructor(
    private bot: Bot
){

    this.finder =
        new ChestFinder(bot);


    this.memory =
        new StorageMemory();

}



async deposit(
itemName?:string
){


const chest =
await this.finder.findChest();



if(!chest){

    this.bot.chat(
        "No chest found"
    );

    return;

}



const container =
await this.bot.openContainer(
    chest
);



for(
const item of this.bot.inventory.items()
){


if(
!itemName ||
item.name.includes(itemName)
){

await container.deposit(
    item.type,
    null,
    item.count
);

}



}



container.close();



this.memory.remember(
    chest.position
);


this.bot.chat(
    "Items stored"
);



}



async withdraw(
itemName:string,
amount:number
){


const chest =
await this.finder.findChest();



if(!chest)
return;



const container =
await this.bot.openContainer(
    chest
);



const item =
container.containerItems()
.find(
i=>i.name.includes(itemName)
);



if(item){


await container.withdraw(
    item.type,
    null,
    Math.min(
        amount,
        item.count
    )
);


}



container.close();



}



}
