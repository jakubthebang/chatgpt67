import { Bot } from "mineflayer";


export class CombatMovement {


    constructor(
        private bot: Bot
    ){}




    approach(
        target:any
    ){


        const distance =
            this.bot.entity.position
            .distanceTo(
                target.position
            );



        if(distance > 3){


            this.bot.setControlState(
                "forward",
                true
            );


        }
        else{


            this.stop();


        }


    }








    retreat(){


        this.bot.setControlState(
            "back",
            true
        );


        setTimeout(()=>{


            this.stop();


        },600);


    }









    strafe(){


        this.bot.setControlState(
            "left",
            true
        );



        setTimeout(()=>{


            this.bot.setControlState(
                "left",
                false
            );


        },400);


    }








    stop(){


        this.bot.clearControlStates();


    }



}
