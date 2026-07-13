import { Bot } from "mineflayer";
import Vec3 from "vec3";


export class EnvironmentScanner {


    private bot: Bot;


    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }





    scan(){

        const pos =
            this.bot.entity.position;



        const results = {


            front: this.checkBlock(
                pos.offset(0,0,1)
            ),


            back: this.checkBlock(
                pos.offset(0,0,-1)
            ),


            left: this.checkBlock(
                pos.offset(-1,0,0)
            ),


            right: this.checkBlock(
                pos.offset(1,0,0)
            ),


            below: this.checkBlock(
                pos.offset(0,-1,0)
            )


        };



        return results;

    }








    private checkBlock(
        pos:Vec3
    ){


        const block =
            this.bot.blockAt(pos);



        if(!block)
            return {
                solid:false,
                name:"air"
            };




        return {


            solid:
                block.boundingBox !== "empty",


            name:
                block.name



        };


    }








    hasWallAhead(){


        const scan =
            this.scan();



        return scan.front.solid;


    }







    isHoleBelow(){


        const scan =
            this.scan();



        return !scan.below.solid;


    }





}
