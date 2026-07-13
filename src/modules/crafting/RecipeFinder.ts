import { Bot } from "mineflayer";
import mcDataLoader from "minecraft-data";


export class RecipeFinder {


    constructor(
        private bot: Bot
    ){}



    find(
        itemName: string
    ){


        const mcData =
            mcDataLoader(this.bot.version);



        const item =
            mcData.itemsByName[itemName];



        if(!item){

            return null;

        }



        const recipes =
            this.bot.recipesFor(
                item.id,
                null,
                1,
                null
            );



        if(
            recipes.length === 0
        )
            return null;



        return {

            recipe: recipes[0],

            requiresTable:
                recipes[0].requiresTable

        };


    }


}
