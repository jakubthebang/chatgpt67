import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

import { ThoughtLogger } from "../ai/ThoughtLogger";



export class FollowController {


    private bot: Bot;

    private thoughts: ThoughtLogger;



    private target?: string;


    private lastPosition?: Vec3;


    private timer?: NodeJS.Timeout;



    private active = false;







    constructor(

        bot: Bot,

        thoughts: ThoughtLogger

    ){


        this.bot = bot;

        this.thoughts = thoughts;


    }









    start(
        playerName:string
    ){


        this.target = playerName;


        this.active = true;



        this.timer =
            setInterval(()=>{


                this.update();



            },500);



    }









    private update(){


        if(!this.active)
            return;



        if(!this.target)
            return;





        const player =
            this.bot.players[this.target];







        if(
            !player ||
            !player.entity
        ){


            this.thoughts.think(

                "Stratil som hráča, hľadám poslednú pozíciu."

            );


            this.searchLastPosition();


            return;

        }







        const distance =
            this.bot.entity.position.distanceTo(

                player.entity.position

            );








        this.lastPosition =
            player.entity.position.clone();









        if(distance > 8){



            this.bot.setControlState(

                "sprint",

                true

            );



            this.thoughts.think(

                `Hráč je ďaleko (${distance.toFixed(1)} blokov), sprintujem.`

            );


        }

        else if(distance < 3){



            this.bot.setControlState(

                "sprint",

                false

            );



            this.thoughts.think(

                "Som blízko hráča, spomaľujem."

            );



        }

        else{



            this.bot.setControlState(

                "sprint",

                false

            );



            this.thoughts.think(

                "Udržiavam vzdialenosť od hráča."

            );


        }



    }









    private searchLastPosition(){



        if(!this.lastPosition)
            return;





        const distance =
            this.bot.entity.position.distanceTo(

                this.lastPosition

            );





        this.thoughts.think(

            `Hľadám hráča pri poslednej pozícii (${distance.toFixed(1)} blokov).`

        );



    }









    stop(){



        this.active = false;



        if(this.timer){


            clearInterval(
                this.timer
            );


            this.timer = undefined;


        }



        this.bot.setControlState(

            "sprint",

            false

        );


    }



}
