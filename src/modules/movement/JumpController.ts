import { Bot } from "mineflayer";
import { Vec3 } from "vec3";


export class JumpController {


    private bot: Bot;


    private interval?: NodeJS.Timeout;


    private jumping = false;


    private enabled = false;


    private retrying = false;



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


        if(this.retrying)
            return;


        if(!bot.entity.onGround)
            return;







        const pos =
            bot.entity.position;



        const yaw =
            bot.entity.yaw;





        const distance = 1.2;





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









        if(

            block.boundingBox === "block"

            &&

            above.boundingBox === "empty"

        ){


            this.performJump();


        }



    }









    private performJump(){


        const bot = this.bot;


        this.jumping = true;



        // malá príprava pred skokom

        bot.clearControlStates();



        setTimeout(()=>{



            bot.setControlState(

                "forward",

                true

            );



            bot.setControlState(

                "jump",

                true

            );





            setTimeout(()=>{



                bot.setControlState(

                    "jump",

                    false

                );



            },150);





            setTimeout(()=>{


                bot.setControlState(

                    "forward",

                    false

                );



                this.checkJumpResult();



            },700);



        },100);




    }









    private checkJumpResult(){



        const bot = this.bot;



        const pos =
            bot.entity.position;



        const blockAbove =
            bot.blockAt(

                pos.offset(
                    0,
                    1,
                    0
                )

            );







        // stále je pri prekážke
        // pravdepodobne skok zlyhal

        if(

            blockAbove &&

            blockAbove.boundingBox === "block"

        ){


            this.retryJump();


        }
        else{


            this.jumping = false;


        }



    }









    private retryJump(){



        const bot = this.bot;



        this.retrying = true;





        // cúvnutie dozadu


        bot.setControlState(

            "back",

            true

        );





        setTimeout(()=>{



            bot.setControlState(

                "back",

                false

            );





            setTimeout(()=>{



                this.jumping = false;

                this.retrying = false;



                this.performJump();



            },300);





        },400);




    }





}