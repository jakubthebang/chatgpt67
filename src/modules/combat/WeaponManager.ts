import { Bot } from "mineflayer";


export class WeaponManager {


    constructor(
        private bot: Bot
    ){}





    async equipBestWeapon(){


        const weapon =
            this.findWeapon();



        if(!weapon)
            return false;



        try{


            await this.bot.equip(
                weapon,
                "hand"
            );


            return true;


        }
        catch(err){


            console.log(
                "WeaponManager:",
                err
            );


            return false;

        }


    }








    private findWeapon(){



        const weapons =
            this.bot.inventory.items()
            .filter(item=>{


                return (

                    item.name.includes("sword")

                    ||

                    item.name.includes("axe")

                );


            });





        if(
            weapons.length === 0
        )
            return null;






        weapons.sort((a,b)=>{


            return (

                this.getDamage(b.name)

                -

                this.getDamage(a.name)

            );


        });





        return weapons[0];


    }









    private getDamage(
        name:string
    ){


        if(name.includes("netherite"))
            return 7;


        if(name.includes("diamond"))
            return 6;


        if(name.includes("iron"))
            return 5;


        if(name.includes("stone"))
            return 4;


        if(name.includes("wood"))
            return 3;


        if(name.includes("gold"))
            return 2;



        return 1;


    }


}
