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



        return this.isWallAhead();


    }









    public isWallAhead(): boolean {



        if(!this.bot.entity)
            return false;




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









    startHandling(){


        this.handling = true;


    }







    stopHandling(){


        this.handling = false;


    }









}