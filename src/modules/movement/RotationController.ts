import { Bot } from "mineflayer";
import { Vec3 } from "vec3";


export class RotationController {


    private bot: Bot;


    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }







    async lookAt(
        position: Vec3
    ){


        if(!this.bot.entity)
            return;



        await this.bot.lookAt(

            position,

            true

        );


    }








    async lookAtPlayer(
        playerName:string
    ){



        const player =

            this.bot.players[playerName];



        if(
            !player ||
            !player.entity
        )
            return;




        await this.lookAt(

            player.entity.position.offset(
                0,
                1.5,
                0
            )

        );


    }









    startFollowLook(
        playerName:string
    ){



        const interval = setInterval(()=>{



            const player =

                this.bot.players[playerName];



            if(
                !player ||
                !player.entity
            )
                return;





            this.lookAtPlayer(
                playerName
            );



        },500);





        return interval;


    }







    stop(
        interval:NodeJS.Timeout
    ){


        clearInterval(
            interval
        );


    }



}
