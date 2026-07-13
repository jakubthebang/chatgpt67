import { Bot } from "mineflayer";
import { Vec3 } from "vec3";



export class RotationController {


    private bot: Bot;


    private looking = false;



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



        if(this.looking)
            return;



        this.looking = true;



        try{


            await this.bot.lookAt(

                position,

                true

            );


        }
        finally{


            this.looking = false;


        }


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





        await this.lookAt(

            target

        );


    }









    startFollowLook(
        playerName:string
    ){



        const timer =
            setInterval(()=>{



                // iba keď bot stojí
                if(
                    this.bot.pathfinder &&
                    this.bot.pathfinder.isMoving()
                )
                    return;




                this.lookAtPlayer(

                    playerName

                );




            },50);





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