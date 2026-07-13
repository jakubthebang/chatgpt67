import { Bot } from "mineflayer";
import { Vec3 } from "vec3";



export class StuckRecoveryAI {


    private bot: Bot;


    private thinking = false;

    private recovering = false;


    private onComplete?: () => void;



    constructor(

        bot: Bot,

        onComplete?: () => void

    ){


        this.bot = bot;

        this.onComplete = onComplete;


    }









    async recover(){



        if(

            this.thinking ||

            this.recovering

        )
            return;





        this.thinking = true;



        console.log(
            "[AI] Movement blocked. Thinking..."
        );





        await this.wait(2000);





        this.thinking = false;

        this.recovering = true;





        this.bot.clearControlStates();





        console.log(
            "[AI] Backing away from obstacle"
        );



        await this.moveBack();





        const moved = await this.tryEscape();





        if(!moved){


            console.log(
                "[AI] Escape failed, trying reverse side"
            );



            await this.turnAndMove();

        }





        this.bot.clearControlStates();




        this.recovering = false;





        if(this.onComplete){

            this.onComplete();

        }



    }









    private async moveBack(){


        this.bot.setControlState(

            "back",

            true

        );


        await this.wait(600);



        this.bot.setControlState(

            "back",

            false

        );


    }









    private async tryEscape(){



        const start =
            this.bot.entity.position.clone();





        const right =
            this.checkSide(1);



        const left =
            this.checkSide(-1);





        if(right){


            console.log(
                "[AI] Choosing right side"
            );


            await this.moveSide("right");

        }
        else if(left){


            console.log(
                "[AI] Choosing left side"
            );


            await this.moveSide("left");

        }
        else{


            return false;

        }





        await this.wait(500);





        const end =
            this.bot.entity.position;





        const distance =

            Math.abs(
                end.x - start.x
            )

            +

            Math.abs(
                end.z - start.z
            );





        return distance > 0.3;


    }









    private async turnAndMove(){



        this.bot.setControlState(

            "left",

            true

        );


        await this.wait(700);



        this.bot.setControlState(

            "left",

            false

        );





        this.bot.setControlState(

            "forward",

            true

        );


        await this.wait(700);



        this.bot.setControlState(

            "forward",

            false

        );


    }









    private async moveSide(

        side:"left"|"right"

    ){



        this.bot.setControlState(

            side,

            true

        );



        await this.wait(600);



        this.bot.setControlState(

            side,

            false

        );



    }









    private checkSide(

        direction:number

    ){



        const pos =
            this.bot.entity.position;



        const yaw =
            this.bot.entity.yaw;





        const sideYaw =

            yaw +

            direction *

            Math.PI / 2;





        const x =
            Math.floor(

                pos.x -

                Math.sin(sideYaw)

            );




        const z =
            Math.floor(

                pos.z +

                Math.cos(sideYaw)

            );





        const block =

            this.bot.blockAt(

                new Vec3(

                    x,

                    Math.floor(pos.y),

                    z

                )

            );





        if(!block)
            return true;



        return block.boundingBox === "empty";


    }









    private wait(

        ms:number

    ){

        return new Promise(

            resolve =>

                setTimeout(resolve,ms)

        );

    }



}