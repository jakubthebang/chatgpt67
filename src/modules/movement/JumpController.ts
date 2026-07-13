import { Bot } from "mineflayer";
import { Vec3 } from "vec3";


export class JumpController {


    private bot: Bot;

    private interval?: NodeJS.Timeout;

    private jumping = false;

    private enabled = false;



    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }





    start(){


        if(this.interval)
            return;


        this.interval = setInterval(()=>{


            this.checkJump();


        },100);


    }





    enable(){

        this.enabled = true;

    }





    disable(){

        this.enabled = false;

        this.bot.clearControlStates();

    }







    stop(){


        if(this.interval){


            clearInterval(
                this.interval
            );


            this.interval = undefined;


        }


    }








    private checkJump(){


        const bot = this.bot;



        if(!this.enabled)
            return;



        if(!bot.entity)
            return;



        if(this.jumping)
            return;



        if(!bot.entity.onGround)
            return;





        const pos =
            bot.entity.position;



        const yaw =
            bot.entity.yaw;





        // kontrola pred botom

        const distance = 1.5;



        const blockX =
            Math.floor(
                pos.x - Math.sin(yaw) * distance
            );


        const blockZ =
            Math.floor(
                pos.z + Math.cos(yaw) * distance
            );


        const blockY =
            Math.floor(
                pos.y
            );





        const block =
            bot.blockAt(
                new Vec3(
                    blockX,
                    blockY,
                    blockZ
                )
            );



        const above =
            bot.blockAt(
                new Vec3(
                    blockX,
                    blockY + 1,
                    blockZ
                )
            );





        if(!block || !above)
            return;






        // 1 block pred botom
        // nad nim je miesto na skok

        if(

            block.boundingBox === "block"

            &&

            above.boundingBox === "empty"

        ){


            this.jump();


        }


    }







    private jump(){


        const bot = this.bot;


        this.jumping = true;



        // krátky vanilla jump

        bot.setControlState(
            "jump",
            true
        );



        setTimeout(()=>{


            bot.setControlState(
                "jump",
                false
            );



            this.jumping = false;



        },150);



    }



}