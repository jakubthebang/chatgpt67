import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

import { JumpController } from "./JumpController";
import { EnvironmentScanner } from "../environment/EnvironmentScanner";



export class ObstacleHandler {


    private bot: Bot;

    private jump: JumpController;

    private scanner: EnvironmentScanner;


    private handling = false;



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



        const result =
            this.scanFront();



        if(!result)
            return;




        this.handleObstacle();



    }









    private scanFront(){



        const pos =
            this.bot.entity.position;



        const yaw =
            this.bot.entity.yaw;



        const distance = 1;



        const x =
            Math.floor(
                pos.x - Math.sin(yaw) * distance
            );



        const z =
            Math.floor(
                pos.z + Math.cos(yaw) * distance
            );



        const y =
            Math.floor(
                pos.y
            );





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





        return (
            block.boundingBox === "block"
        );


    }









    private async handleObstacle(){


        this.handling = true;




        // zastavi pohyb

        this.bot.clearControlStates();





        // malé cúvnutie

        this.bot.setControlState(

            "back",

            true

        );




        await this.wait(400);




        this.bot.setControlState(

            "back",

            false

        );








        // najskôr skúsi skok


        this.jump.enable();



        this.bot.setControlState(

            "forward",

            true

        );



        await this.wait(100);





        this.bot.setControlState(

            "jump",

            true

        );




        await this.wait(150);




        this.bot.setControlState(

            "jump",

            false

        );





        await this.wait(700);







        // ak stále stojí pri stene

        if(this.scanFront()){


            this.trySide();

        }






        this.bot.setControlState(

            "forward",

            false

        );



        this.handling = false;



    }









    private trySide(){



        const env =
            this.scanner.scan();





        if(!env.right.solid){


            this.bot.setControlState(

                "right",

                true

            );


            setTimeout(()=>{


                this.bot.setControlState(

                    "right",

                    false

                );


            },500);



            return;

        }








        if(!env.left.solid){


            this.bot.setControlState(

                "left",

                true

            );



            setTimeout(()=>{


                this.bot.setControlState(

                    "left",

                    false

                );


            },500);



        }



    }









    private wait(
        ms:number
    ){


        return new Promise(

            resolve =>
                setTimeout(resolve, ms)

        );


    }



}
