import { Bot } from "mineflayer";

export class AutoArmor {

    private bot: Bot;

    private interval?: NodeJS.Timeout;

    constructor(bot: Bot) {
        this.bot = bot;
    }


    public start() {

        this.interval = setInterval(async () => {

            await this.checkArmor();

        }, 2000);

    }



    public stop() {

        if (this.interval) {

            clearInterval(this.interval);

            this.interval = undefined;

        }

    }




    private async checkArmor() {

        try {


            const armorSlots = [
                "head",
                "torso",
                "legs",
                "feet"
            ];



            for (const slot of armorSlots) {


                const bestArmor =
                    this.findBestArmor(slot);



                if (!bestArmor)
                    continue;



                const current =
                    this.getCurrentArmor(slot);



                if (
                    !current ||
                    this.getArmorValue(bestArmor.name)
                    >
                    this.getArmorValue(current.name)
                ) {


                    await this.bot.equip(
                        bestArmor,
                        slot as any
                    );


                    console.log(
                        `[AutoArmor] Equipped ${bestArmor.name}`
                    );

                }


            }


        }
        catch(err){

            console.log(
                "AutoArmor:",
                err
            );

        }


    }






    private findBestArmor(slot:string) {


        const items =
            this.bot.inventory.items()
            .filter(item => {


                if(slot === "head")
                    return item.name.includes("helmet");


                if(slot === "torso")
                    return item.name.includes("chestplate");


                if(slot === "legs")
                    return item.name.includes("leggings");


                if(slot === "feet")
                    return item.name.includes("boots");


                return false;

            });



        if(items.length === 0)
            return null;



        items.sort((a,b)=>{

            return (
                this.getArmorValue(b.name)
                -
                this.getArmorValue(a.name)
            );

        });



        return items[0];

    }







    private getCurrentArmor(slot:string) {


        const equipment =
            this.bot.inventory.slots;



        switch(slot){


            case "head":
                return equipment[5];


            case "torso":
                return equipment[6];


            case "legs":
                return equipment[7];


            case "feet":
                return equipment[8];


            default:
                return null;

        }

    }








    private getArmorValue(name:string):number {


        if(name.includes("netherite"))
            return 6;


        if(name.includes("diamond"))
            return 5;


        if(name.includes("iron"))
            return 4;


        if(name.includes("chainmail"))
            return 3;


        if(name.includes("gold"))
            return 2;


        if(name.includes("leather"))
            return 1;


        return 0;

    }


}
