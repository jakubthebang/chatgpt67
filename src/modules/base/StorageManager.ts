import { Bot } from "mineflayer";


export class StorageManager {


constructor(
private bot:Bot
){}



getItems(){


return this.bot.inventory.items();

}



hasItem(
name:string
){


return this.bot.inventory.items()
.some(
item =>
item.name.includes(name)
);


}



count(
name:string
){


return this.bot.inventory.items()
.filter(
item =>
item.name.includes(name)
)
.reduce(
(sum,item)=>
sum+item.count,
0
);



}



}