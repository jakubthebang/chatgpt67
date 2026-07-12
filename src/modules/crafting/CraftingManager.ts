import { Bot } from "mineflayer";
import { RecipeFinder } from "./RecipeFinder";


export class CraftingManager {


private recipes: RecipeFinder;



constructor(
    private bot: Bot
){

    this.recipes =
        new RecipeFinder(bot);

}




async craft(
itemName:string,
amount:number = 1
){


const recipe =
this.recipes.find(
    itemName
);



if(!recipe){

    this.bot.chat(
        `Recipe not found: ${itemName}`
    );

    return;

}



const table =
this.bot.findBlock({

matching:block =>
block.name === "crafting_table",

maxDistance:32

});




if(
recipe.requiresTable &&
!table
){

    this.bot.chat(
        "Need crafting table nearby"
    );

    return;

}



try{


await this.bot.craft(
    recipe.recipe,
    amount,
    table
);


this.bot.chat(
    `Crafted ${amount}x ${itemName}`
);



}catch(error){


this.bot.chat(
    `Cannot craft ${itemName}`
);


}



}



}
