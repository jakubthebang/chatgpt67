import { Bot } from "mineflayer";
import { Vec3 } from "vec3";


export class EnvironmentManager {


    private bot: Bot;



    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }






    scanBlock(
        pos: Vec3
    ){


        const block =
            this.bot.blockAt(pos);



        if(!block){

            return {

                solid:false,

                name:"air"

            };

        }




        return {


            solid:
                block.boundingBox !== "empty",


            name:
                block.name


        };


    }






    getNearbyBlocks(){


        const pos =
            this.bot.entity.position;



        return {


            front:
                this.scanBlock(
                    pos.offset(0,0,1)
                ),


            back:
                this.scanBlock(
                    pos.offset(0,0,-1)
                ),


            left:
                this.scanBlock(
                    pos.offset(-1,0,0)
                ),


            right:
                this.scanBlock(
                    pos.offset(1,0,0)
                ),


            below:
                this.scanBlock(
                    pos.offset(0,-1,0)
                )


        };


    }





}