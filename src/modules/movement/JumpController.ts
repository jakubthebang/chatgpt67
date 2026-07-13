import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

import { JumpRecoveryAI } from "./JumpRecoveryAI";



export class JumpController {


    private bot: Bot;


    private interval?: NodeJS.Timeout;


    private jumping = false;


    private enabled = false;


    private recovering = false;


    private jumpAI: JumpRecoveryAI;


    private startPosition?: Vec3;


    private onFailed?: () => void;





    constructor(

        bot: Bot,

        onFailed?: () => void

    ){


        this.bot = bot;

        this.onFailed = onFailed;




        this.jumpAI =

            new JumpRecoveryAI(

                bot,

                ()=>{


                    console.log(
                        "[AI] Jump failed, requesting new route"
                    );



                    if(this.onFailed){

                        this.onFailed();

                    }


                }

            );


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


        if(!this.enabled)
            return;



        if(!this.bot.entity)
            return;



        if(this.jumping)
            return;



        if(this.recovering)
            return;



        if(!this.bot.entity.onGround)
            return;





        const pos =
            this.bot.entity.position;



        const yaw =
            this.bot.entity.yaw;





        const distance = 1.2;





        const blockX =
            Math.floor(

                pos.x -

                Math.sin(yaw) *

                distance

            );





        const blockZ =
            Math.floor(

                pos.z +

                Math.cos(yaw) *

                distance

            );





        const blockY =
            Math.floor(pos.y);





        const block =

            this.bot.blockAt(

                new Vec3(

                    blockX,

                    blockY,

                    blockZ

                )

            );





        const above =

            this.bot.blockAt(

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


        this.jumping = true;



        this.startPosition =

            this.bot.entity.position.clone();





        this.bot.clearControlStates();







        setTimeout(()=>{



            this.bot.setControlState(

                "forward",

                true

            );



            this.bot.setControlState(

                "jump",

                true

            );







            setTimeout(()=>{


                this.bot.setControlState(

                    "jump",

                    false

                );


            },150);







            setTimeout(()=>{


                this.bot.setControlState(

                    "forward",

                    false

                );



                this.checkJumpResult();



            },900);





        },100);



    }









    private async checkJumpResult(){



        if(!this.startPosition){


            this.jumping = false;

            return;


        }





        const pos =

            this.bot.entity.position;





        const moved =

            Math.abs(

                pos.x -

                this.startPosition.x

            )

            +

            Math.abs(

                pos.y -

                this.startPosition.y

            )

            +

            Math.abs(

                pos.z -

                this.startPosition.z

            );







        if(moved < 0.3){



            console.log(

                "[AI] Jump failed"

            );




            this.jumping = false;


            this.recovering = true;





            await this.jumpAI.recover();





            this.jumpAI.reset();





            this.recovering = false;



            return;


        }







        this.jumping = false;



    }



}