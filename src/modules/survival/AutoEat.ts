import { Bot } from "mineflayer";


export class AutoEat {


constructor(
    private bot: Bot
){}



start(){

setInterval(()=>{


if(this.bot.food <= 14){

    const food =
    this.bot.inventory.items()
    .find(item =>
        item.name.includes("bread") ||
        item.name.includes("apple") ||
        item.name.includes("cooked")
    );


    if(food){

        this.bot.equip(
            food,
            "hand"
        ).then(()=>{

            this.bot.consume();

        }).catch(()=>{});


    }

}


},5000);


}


}
