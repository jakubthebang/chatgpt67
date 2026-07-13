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




        const target =
            player.entity.position.offset(
                0,
                1.4,
                0
            );



        await this.bot.lookAt(

            target,

            true

        );


    }








    startFollowLook(
        playerName:string
    ){


        const timer =
            setInterval(()=>{


                this.lookAtPlayer(
                    playerName
                );


            },100);



        return timer;


    }








    stop(
        timer:NodeJS.Timeout
    ){


        clearInterval(
            timer
        );


    }



}