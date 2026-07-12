import { Bot } from "mineflayer";


export class RecipeFinder {


constructor(
    private bot:Bot
){}



find(
itemName:string
){


const recipes =
this.bot.recipesFor(
    itemName,
    null,
    1,
    null
);



if(
recipes.length === 0
)
return null;



return {

recipe:recipes[0],

requiresTable:
recipes[0].requiresTable

};



}


}
