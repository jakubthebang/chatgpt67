import { Bot } from "mineflayer";

import { EnvironmentScanner } from "../environment/EnvironmentScanner";
import { PathDecisionSystem } from "./PathDecisionSystem";
import { ObstacleHandler } from "./ObstacleHandler";



export class MovementBrain {


    private bot: Bot;


    private scanner: EnvironmentScanner;

    private decision: PathDecisionSystem;

    private obstacle: ObstacleHandler;



    private timer?: NodeJS.Timeout;


    private active = false;







    constructor(

        bot: Bot,

        scanner: EnvironmentScanner,

        decision: PathDecisionSystem,

        obstacle: ObstacleHandler

    ){


        this.bot = bot;


        this.scanner = scanner;


        this.decision = decision;


        this.obstacle = obstacle;


    }









    start(){


        if(this.active)
            return;



        this.active = true;




        this.timer =
            setInterval(()=>{


                this.think();



            },200);



    }









    private think(){



        if(!this.bot.entity)
            return;





        /*
            1. kontrola prekážok
        */


        const environment =
            this.scanner.scan();




        if(

            environment.front.solid

        ){


            this.obstacle.checkObstacle();


            return;

        }







        /*
            2. kontrola potreby novej cesty
        */


        if(

            this.decision.shouldRecalculate()

        ){


            return;

        }





    }









    stop(){



        this.active = false;



        if(this.timer){


            clearInterval(
                this.timer
            );


            this.timer = undefined;


        }


    }




}
