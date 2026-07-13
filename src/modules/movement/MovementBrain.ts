import { Bot } from "mineflayer";

import { EnvironmentScanner } from "../environment/EnvironmentScanner";
import { PathDecisionSystem } from "./PathDecisionSystem";
import { ObstacleHandler } from "./ObstacleHandler";
import { ThoughtLogger } from "../ai/ThoughtLogger";



export class MovementBrain {


    private bot: Bot;


    private scanner: EnvironmentScanner;

    private decision: PathDecisionSystem;

    private obstacle: ObstacleHandler;


    private thoughts: ThoughtLogger;



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



        this.thoughts =
            new ThoughtLogger(
                bot
            );


    }









    start(){


        if(this.active)
            return;



        this.active = true;



        this.thinkingLoop();



    }









    private thinkingLoop(){



        this.timer =
            setInterval(()=>{


                this.think();



            },200);



    }









    private think(){



        if(!this.bot.entity)
            return;





        const environment =
            this.scanner.scan();






        /*
            kontrola prekážky
        */


        if(

            environment.front.solid

        ){



            this.thoughts.think(

                "Predo mnou je prekážka, analyzujem cestu."

            );



            this.obstacle.checkObstacle();



            return;

        }








        /*
            kontrola novej cesty
        */


        if(

            this.decision.shouldRecalculate()

        ){



            this.thoughts.think(

                "Moja cesta nie je ideálna, hľadám novú."

            );



            return;

        }









        this.thoughts.think(

            "Cesta je voľná, pokračujem za hráčom."

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



    }





}