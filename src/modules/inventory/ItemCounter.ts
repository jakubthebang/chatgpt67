import { Bot } from "mineflayer";


export class ItemCounter {


constructor(
    private bot:Bot
){}



count(
itemName:string
){


return this.bot.inventory.items()
.reduce(
(total,item)=>{


if(
item.name.includes(itemName)
){

return total + item.count;

}


return total;


},0);



}


}
