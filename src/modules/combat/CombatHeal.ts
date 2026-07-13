import { Bot } from "mineflayer";


export class CombatHeal {


    constructor(
        private bot: Bot
    ){}



    async heal(){


        const food =
            this.findFood();



        if(!food)
            return false;



        try{


            await this.bot.equip(
                food,
                "hand"
            );


            await this.bot.consume();


            return true;


        }
        catch(err){


            console.log(
                "CombatHeal:",
                err
            );


            return false;

        }


    }







    private findFood(){


        const foods =
            this.bot.inventory.items()
            .filter(item=>{


                return (

                    item.name.includes("beef")

                    ||

                    item.name.includes("pork")

                    ||

                    item.name.includes("bread")

                    ||

                    item.name.includes("golden_carrot")

                    ||

                    item.name.includes("apple")

                );


            });




        if(
            foods.length === 0
        )
            return null;



        return foods[0];


    }



}
