import { Bot } from "mineflayer";
import { EnvironmentScanner } from "../environment/EnvironmentScanner";


export class PathDecisionSystem {


    private bot: Bot;

    private scanner: EnvironmentScanner;




    constructor(
        bot: Bot,
        scanner: EnvironmentScanner
    ){

        this.bot = bot;
        this.scanner = scanner;

    }







    getDirection(){


        const environment =
            this.scanner.scan();



        // nič pred botom

        if(!environment.front.solid){

            return "forward";

        }






        // pred botom je stena

        // skúsi pravú stranu

        if(!environment.right.solid){

            return "right";

        }





        // skúsi ľavú stranu

        if(!environment.left.solid){

            return "left";

        }





        // ak je zavretý zo strán

        if(!environment.back.solid){

            return "back";

        }





        return "blocked";


    }









    shouldRecalculate(){


        const direction =
            this.getDirection();



        return direction !== "forward";


    }









    getAvoidDirection(){


        return this.getDirection();


    }




}
