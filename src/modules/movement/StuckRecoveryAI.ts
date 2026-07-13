import { Bot } from "mineflayer";
import { Vec3 } from "vec3";



export class StuckRecoveryAI {


    private bot: Bot;


    private thinking = false;

    private recovering = false;



    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }









    async recover(){


        if(this.thinking || this.recovering)
            return;



        this.thinking = true;



        console.log(
            "[AI] Movement blocked. Thinking..."
        );



        // AI premýšľa

        await this.wait(2000);




        this.thinking = false;


        this.recovering = true;




        const decision =
            this.analyseEnvironment();





        console.log(
            `[AI] Decision: ${decision}`
        );





        await this.executeDecision(
            decision
        );





        this.recovering = false;



    }









    private analyseEnvironment(){



        const left =
            this.checkSide(-1);



        const right =
            this.checkSide(1);





        if(right){

            return "RIGHT";

        }




        if(left){

            return "LEFT";

        }




        return "BACK";



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
            direction * Math.PI / 2;





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









    private async executeDecision(
        decision:string
    ){



        this.bot.clearControlStates();



        if(decision === "RIGHT"){


            this.bot.setControlState(
                "right",
                true
            );


            await this.wait(500);


        }



        if(decision === "LEFT"){


            this.bot.setControlState(
                "left",
                true
            );


            await this.wait(500);


        }




        if(decision === "BACK"){


            this.bot.setControlState(
                "back",
                true
            );


            await this.wait(700);


        }





        this.bot.clearControlStates();


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
