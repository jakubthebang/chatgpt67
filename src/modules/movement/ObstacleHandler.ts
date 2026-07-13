import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

import { JumpController } from "./JumpController";
import { EnvironmentScanner } from "../environment/EnvironmentScanner";



export class ObstacleHandler {


    private bot: Bot;

    private jump: JumpController;

    private scanner: EnvironmentScanner;


    private handling = false;


    private stuckTime = 0;



    constructor(

        bot: Bot,

        jump: JumpController,

        scanner: EnvironmentScanner

    ){


        this.bot = bot;

        this.jump = jump;

        this.scanner = scanner;


    }









    checkObstacle(){


        if(this.handling)
            return;



        if(!this.scanFront())
            return;



        this.stuckTime++;



        // čakáme približne 2 sekundy

        if(this.stuckTime < 8)
            return;



        this.stuckTime = 0;



        this.handleObstacle();


    }









    private scanFront(){


        const pos =
            this.bot.entity.position;



        const yaw =
            this.bot.entity.yaw;



        const x =
            Math.floor(
                pos.x - Math.sin(yaw)
            );



        const z =
            Math.floor(
                pos.z + Math.cos(yaw)
            );



        const y =
            Math.floor(pos.y);





        const block =
            this.bot.blockAt(

                new Vec3(
                    x,
                    y,
                    z
                )

            );





        if(!block)
            return false;



        return block.boundingBox === "block";


    }









    private async handleObstacle(){



        this.handling = true;




        this.bot.clearControlStates();



        // najskôr skúsi obísť doprava

        const env =
            this.scanner.scan();






        if(!env.right.solid){



            this.bot.setControlState(
                "right",
                true
            );



            await this.wait(600);



            this.bot.setControlState(
                "right",
                false
            );



            this.handling = false;

            return;

        }








        // potom doľava

        if(!env.left.solid){



            this.bot.setControlState(
                "left",
                true
            );



            await this.wait(600);



            this.bot.setControlState(
                "left",
                false
            );



            this.handling = false;

            return;

        }








        // ak sa nedá obísť cúvne

        this.bot.setControlState(

            "back",

            true

        );



        await this.wait(700);



        this.bot.setControlState(

            "back",

            false

        );




        this.handling = false;



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